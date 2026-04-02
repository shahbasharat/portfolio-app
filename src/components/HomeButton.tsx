"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeButton() {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {pathname !== "/" && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000]"
        >
          <Link 
            href="/"
            className="flex items-center gap-2 px-6 py-2.5 bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-neutral-300 hover:text-white font-medium tracking-[0.2em] uppercase text-xs hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            <Home className="w-4 h-4" />
            HOME
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
