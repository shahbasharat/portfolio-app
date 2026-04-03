"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";

export default function NotFound() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left — Text Content */}
        <div className="text-left">

          {/* Shield icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          {/* 404 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-[100px] md:text-[150px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-600 mb-4 select-none ${glitch ? "opacity-80 translate-x-1" : ""} transition-all duration-100`}
          >
            404
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xl md:text-2xl font-light text-neutral-400 mb-2">
              Access Denied
            </p>
            <p className="text-neutral-600 text-base md:text-lg mb-10 font-light">
              This page doesn't exist or has been moved.<br className="hidden md:block" />
              Let's get you back to safety.
            </p>
          </motion.div>

          {/* Terminal box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-neutral-900 border border-white/[0.08] rounded-2xl p-6 mb-10 text-left font-mono text-sm"
          >
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <p className="text-neutral-500">$ ping <span className="text-white">requested-page</span></p>
            <p className="text-red-400 mt-1">Request timeout — host unreachable</p>
            <p className="text-neutral-500 mt-1">$ <span className="text-blue-400 animate-pulse">_</span></p>
          </motion.div>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              Return to Home
            </Link>
          </motion.div>
        </div>

        {/* Right — Your Whisk Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="hidden md:flex justify-center items-center relative"
        >
          {/* Glow behind image */}
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[80px]" />

          {/* Circle frame */}
          <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden border border-white/10">
            <img
              src="/sequence/frame_068.gif"
              alt="Basharat Salam"
              className="w-full h-full object-cover opacity-90"
            />
            {/* Gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Floating name badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 backdrop-blur-md px-6 py-3 rounded-full text-center"
          >
            <p className="text-white font-medium text-sm">Basharat Salam</p>
            <p className="text-neutral-400 text-xs">System & Network Administrator</p>
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
}