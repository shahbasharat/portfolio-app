"use client";
import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    let animationId: number;
    const animate = () => {
      circleX += (mouseX - circleX) * 0.12;
      circleY += (mouseY - circleY) * 0.12;
      circle.style.transform = `translate(${circleX}px, ${circleY}px)`;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: "white",
          borderRadius: "50%",
          marginLeft: "-3px",
          marginTop: "-3px",
          transition: "opacity 0.3s",
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Following circle */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: isHovering ? "50px" : "36px",
          height: isHovering ? "50px" : "36px",
          border: isHovering ? "1.5px solid #60a5fa" : "1.5px solid rgba(255,255,255,0.5)",
          borderRadius: "50%",
          marginLeft: isHovering ? "-25px" : "-18px",
          marginTop: isHovering ? "-25px" : "-18px",
          transition: "width 0.3s, height 0.3s, border-color 0.3s, margin 0.3s, opacity 0.3s",
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? "rgba(96, 165, 250, 0.08)" : "transparent",
        }}
      />
    </>
  );
}