"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeButton() {
  const pathname = usePathname();

  // Only show on /resume — all other pages already have the Navbar
  const show = pathname === "/resume";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-4 left-6 z-[1000]"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/10 rounded-full text-neutral-300 hover:text-white font-medium tracking-[0.15em] uppercase text-xs hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            <Home className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
