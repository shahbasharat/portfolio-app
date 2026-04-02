"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate opacities based on scroll sections map 3 sections:
  // 0% - 20% -> Hero Section (fade in early, fade out)
  // 30% - 50% -> Vision Section
  // 60% - 80% -> Expertise Section

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.25], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const visionOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const visionY = useTransform(scrollYProgress, [0.25, 0.35, 0.55], [50, 0, -50]);

  const expertiseOpacity = useTransform(scrollYProgress, [0.55, 0.65, 0.8, 0.9], [0, 1, 1, 0]);
  const expertiseY = useTransform(scrollYProgress, [0.55, 0.65, 0.9], [50, 0, -50]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none h-full">
      {/* Container blocks matching scroll length - absolute pinned heights for scrolling triggers */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none px-6 md:px-24">
        
        {/* Sequence 1: 0% */}
        <motion.div 
          className="absolute text-center px-4"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-500 drop-shadow-2xl">
            Basharat Salam.
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-3xl font-light tracking-wide text-neutral-400">
            System Admin <span className="text-white/20 mx-1 md:mx-2">|</span> Network Administrator.
          </p>
        </motion.div>

        {/* Sequence 2: 30% */}
        <motion.div 
          className="absolute left-6 md:left-24 text-left max-w-2xl px-2"
          style={{ opacity: visionOpacity, y: visionY }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            I secure <br className="hidden md:block" />
            <span className="text-zinc-500 hover:text-white transition-colors duration-500">digital environments.</span>
          </h2>
        </motion.div>

        {/* Sequence 3: 60% */}
        <motion.div 
          className="absolute right-6 md:right-24 text-right max-w-2xl px-2"
          style={{ opacity: expertiseOpacity, y: expertiseY }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Threat <br />
            <span className="italic font-light opacity-80 decoration-neutral-800 underline underline-offset-4 md:underline-offset-[16px]">
              detection
            </span>{" "}
            and{" "}
            <span className="italic font-light opacity-80 decoration-neutral-800 underline underline-offset-4 md:underline-offset-[16px]">
              defense.
            </span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
