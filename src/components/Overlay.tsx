"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ROLES = [
  "System Administrator.",
  "Network Administrator.",
  "SOC Analyst.",
  "IT Infrastructure Lead.",
];

function TypingText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span className="inline-block w-[3px] h-[1em] bg-white ml-1 align-middle animate-pulse" />
      )}
    </span>
  );
}

function RoleCycler() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Each role stays for 3.5s then fades for 0.4s then switches
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.span
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: 0.35 }}
      className="inline-block text-neutral-400"
    >
      {ROLES[index]}
    </motion.span>
  );
}

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.25], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const visionOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const visionY = useTransform(scrollYProgress, [0.25, 0.35, 0.55], [50, 0, -50]);
  const expertiseOpacity = useTransform(scrollYProgress, [0.55, 0.65, 0.8, 0.9], [0, 1, 1, 0]);
  const expertiseY = useTransform(scrollYProgress, [0.55, 0.65, 0.9], [50, 0, -50]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none h-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none px-6 md:px-24">

        {/* Sequence 1: Hero with typing animation + role cycler */}
        <motion.div
          className="absolute text-center px-4"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-500 drop-shadow-2xl">
            <TypingText text="Basharat Salam." />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-4 text-base sm:text-lg md:text-3xl font-light tracking-wide"
          >
            <RoleCycler />
          </motion.p>

          {/* Scroll hint arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-12 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1 text-neutral-600"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll</span>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Sequence 2: Vision */}
        <motion.div
          className="absolute left-6 md:left-24 text-left max-w-2xl px-2"
          style={{ opacity: visionOpacity, y: visionY }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            I secure <br className="hidden md:block" />
            <span className="text-zinc-500 hover:text-white transition-colors duration-500">digital environments.</span>
          </h2>
        </motion.div>

        {/* Sequence 3: Expertise */}
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