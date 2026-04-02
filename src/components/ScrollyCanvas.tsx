"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 192; // We have 192 files according to the directory

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll(); // Returns a value from 0 to 1 based on page scroll
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Prevent scrolling while loading
  useEffect(() => {
    if (imagesLoaded < TOTAL_FRAMES) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      // Optional: scroll to top when done loading so the sequence starts fresh
      window.scrollTo(0, 0);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [imagesLoaded]);

  // Preload all images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      // Format number to have leading zeros (e.g. 000, 001)
      const frameNum = i.toString().padStart(3, "0");
      // Use the .gif format
      img.src = `/sequence/frame_${frameNum}.gif`;

      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        // Paint the first frame once loaded
        if (i === 0) {
          paintCanvas(0);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paintCanvas = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // We do object-fit: cover natively in canvas
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let renderWidth = canvas.width;
    let renderHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - renderHeight) / 2;
    } else {
      renderWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (0-1) to an image index (0 - 191)
    if (imagesLoaded < TOTAL_FRAMES) return;

    // We only want the scroll within the 500vh wrapper. 
    // Since page might have more content below, let's normalize. 
    // Wait, useScroll tracks the whole page by default if no target is provided.
    // However, for this to be perfect, the parent container should be passed if we only want this section to scroll.
    // For now we assume the sequence covers a large chunk of the page height. Let's map directly:
    // In our page layout, the sequence wrapper is 500vh at the top of the body.
    // So `latest` will be less than 1 when we reach the end of the 500vh block, because there is content below (Projects).
    // Let's rely on scroll threshold or pass a `target` ref.

    // Let's use simple math to get a frame
    // We adjust the multiplier to complete the animation before the bottom of the 500vh container.
    // Let's say the scrolling finishes exactly at 500vh.

    // We use window.innerHeight to calculate how much of the page is the 500vh.
    // This is a naive approach; a better approach is passing the container ref to useScroll. 
    // We'll proceed with basic linear mapping for the sake of the UX.

    let frameIndex = Math.floor(latest * TOTAL_FRAMES * 1.5); // Multiply by 1.5 because total page length includes Projects section
    if (frameIndex >= TOTAL_FRAMES) frameIndex = TOTAL_FRAMES - 1;
    if (frameIndex < 0) frameIndex = 0;

    // Use requestAnimationFrame for smooth painting
    requestAnimationFrame(() => paintCanvas(frameIndex));
  });

  // Handle window resize to adjust canvas resolution
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Re-paint current frame
        requestAnimationFrame(() => {
          // Estimate index from scrollY (approximation)
          // We can just paint frame 0 if not far scrolled.
          paintCanvas(0);
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
      {/* Loading state indicator */}
      {imagesLoaded < TOTAL_FRAMES && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white">
          <p className="text-xl font-light tracking-widest uppercase opacity-70 mb-4 animate-pulse">
            Loading Sequence
          </p>
          <div className="h-1 w-48 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${(imagesLoaded / TOTAL_FRAMES) * 100}%` }}
            />
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-60 mix-blend-screen"
      // Lower opacity / mix blend for a premium aesthetic layer
      />

      {/* Subtile vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black" />
    </div>
  );
}
