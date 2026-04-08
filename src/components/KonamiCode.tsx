"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

export default function KonamiCode() {
  const [keys, setKeys] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key;
      setKeys((prev) => {
        const updated = [...prev, key].slice(-KONAMI.length);
        const matched = KONAMI.slice(0, updated.length).every(
          (k, i) => k === updated[i] || 
          (updated.length < KONAMI.length && updated.every((uk, ui) => KONAMI[ui] === uk))
        );
        
        let currentProgress = 0;
        for (let i = 0; i < KONAMI.length; i++) {
          if (updated[updated.length - (KONAMI.length - i)] === KONAMI[i]) {
            currentProgress = i + 1;
          } else {
            break;
          }
        }
        setProgress(currentProgress);

        if (updated.join(",") === KONAMI.join(",")) {
          setActivated(true);
          setProgress(0);
          setTimeout(() => setActivated(false), 4000);
        }
        return updated;
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Progress indicator */}
      <AnimatePresence>
        {progress > 0 && !activated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-6 z-[99999] bg-neutral-900 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2"
          >
            <span className="text-xs text-neutral-400 font-mono">{progress}/{KONAMI.length}</span>
            <div className="flex gap-1">
              {KONAMI.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i < progress ? "bg-blue-400" : "bg-neutral-700"}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter egg */}
      <AnimatePresence>
        {activated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <div className="relative z-10 text-center px-6">
              <motion.div
                animate={{ x: [-2, 2, -2, 0], opacity: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-white to-blue-600 mb-4 select-none"
              >
                CHEAT CODE!
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-neutral-400 text-lg md:text-2xl font-light mb-6"
              >
                You found the secret! 🎮
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-neutral-600 text-sm md:text-base font-mono"
              >
                ↑ ↑ ↓ ↓ ← → ← → B A
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex justify-center gap-3 flex-wrap"
              >
                {["System Admin", "Network Pro", "Security Expert", "IT Wizard"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                    className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-mono"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            {["🎮", "🔐", "🛡️", "💻", "🌐", "⚡"].map((emoji, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: [0, 1, 0], y: -200, x: (i % 2 === 0 ? 1 : -1) * Math.random() * 200 }}
                transition={{ delay: i * 0.15, duration: 2 }}
                className="absolute text-4xl select-none"
                style={{ left: `${15 + i * 14}%`, bottom: "10%" }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}