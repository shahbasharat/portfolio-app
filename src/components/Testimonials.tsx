"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Hi Basharat, I'd like to take a moment to sincerely appreciate your contributions to our IT team. Your dedication, technical expertise, and proactive approach have consistently made a positive impact on our projects and overall team performance. You have demonstrated a strong ability to troubleshoot complex issues, deliver high-quality work under pressure, and collaborate effectively with team members. Your willingness to go the extra mile and support others does not go unnoticed. Your commitment to continuous learning and improvement is especially commendable, and it sets a great example for the rest of the team. We truly value your contributions and look forward to your continued success and growth within the team.",
    name: "Mr. Mahesh Khattana",
    role: "Sr. IT Manager",
    company: "The Khyber Himalayan Resort & Spa",
  },
  {
    quote: "A highly dedicated IT professional who consistently delivered results. His expertise in Sophos firewall and EDR management greatly enhanced our security posture.",
    name: "GiriRaj Junan",
    role: "Department Head",
    company: "Skyview by Empyrean",
  },
  {
    quote: "Basharat provided excellent technical support and resolved complex Wi-Fi issues efficiently. His communication skills and problem-solving ability were outstanding.",
    name: "Mr. Shabir Ahmad",
    role: "Team Lead",
    company: "Ison Xperience",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="relative w-full py-24 px-4 md:px-24 bg-[#0a0a0a] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4"
          >
            What People Say
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-6xl lg:text-7xl font-light"
          >
            <span className="font-bold text-white">Testimonials.</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-neutral-900 border border-white/[0.07] p-8 md:p-12 rounded-3xl relative overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-bl-full blur-3xl pointer-events-none" />

              <Quote className="w-10 h-10 text-blue-500/30 mb-8 shrink-0" />

              <p className="text-neutral-200 font-light text-base md:text-xl leading-relaxed mb-10 max-w-4xl">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <span className="text-blue-400 font-bold">
                      {t.name.replace(/^(Mr\.|Ms\.|Dr\.)\s*/i, "").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t.name}</p>
                    <p className="text-neutral-500 text-sm">{t.role} · {t.company}</p>
                  </div>
                </div>

                {/* Nav controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-all duration-300"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-neutral-600">
                    {active + 1} / {testimonials.length}
                  </span>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-all duration-300"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-neutral-600 hover:bg-neutral-400"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}