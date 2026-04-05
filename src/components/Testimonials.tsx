"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Basharat demonstrated exceptional technical skills in managing our network infrastructure. His proactive approach to security monitoring and quick incident response made a significant impact on our operations.",
      name: "Mr. mahesh Khattana ",
      role: "IT Manager",
      company: "The Khyber Himalayan Resort & Spa"
    },
    {
      quote: "A highly dedicated IT professional who consistently delivered results. His expertise in Sophos firewall and EDR management greatly enhanced our security posture.",
      name: "GiriRaj Junan",
      role: "Department Head",
      company: "Skyview by Empyrean"
    },
    {
      quote: "Basharat provided excellent technical support and resolved complex Wi-Fi issues efficiently. His communication skills and problem-solving ability were outstanding.",
      name: "Mr. Shabir Ahmad",
      role: "Team Lead",
      company: "Ison Xperience"
    }
  ];

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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-neutral-900 border border-white/[0.05] p-6 md:p-8 rounded-2xl hover:border-white/[0.15] transition-all duration-500 group relative overflow-hidden flex flex-col"
            >
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quote icon */}
              <Quote className="w-8 h-8 text-blue-500/40 mb-6 shrink-0" />

              {/* Quote text */}
              <p className="text-neutral-300 font-light text-sm md:text-base leading-relaxed flex-1 mb-8">
                "{t.quote}"
              </p>

              {/* Person info */}
              <div className="flex items-center gap-4 mt-auto">
                {/* Avatar circle */}
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 font-bold text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-neutral-500 text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}