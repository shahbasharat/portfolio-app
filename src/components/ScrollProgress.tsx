"use client";
import { useScroll, useSpring, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (pathname === "/resume") return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[99999] origin-left"
      style={{ scaleX }}
    />
  );
}