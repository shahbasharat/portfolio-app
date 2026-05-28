"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 2,  suffix: "+", label: "Years in Enterprise IT" },
  { value: 3,  suffix: "",  label: "Companies Served" },
  { value: 4,  suffix: "",  label: "Security Projects" },
  { value: 8,  suffix: "+", label: "Certifications Earned" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="relative w-full py-16 px-6 md:px-24 bg-[#080808] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/[0.05]">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center md:items-start md:px-10 first:pl-0 last:pr-0 text-center md:text-left"
          >
            <span className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-2">
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-mono">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
