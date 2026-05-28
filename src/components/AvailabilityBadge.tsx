"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, X } from "lucide-react";

export default function AvailabilityBadge() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, delay: 3 }}
          className="fixed bottom-6 left-6 z-[500] flex items-center gap-3 px-4 py-3 bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl group"
        >
          {/* Green pulse dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>

          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold text-white">Open to Work</span>
            <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
              <Wifi className="w-2.5 h-2.5" />
              Available · System &amp; Network Admin roles
            </span>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="ml-1 text-neutral-600 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
