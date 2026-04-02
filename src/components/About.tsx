"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative w-full py-24 px-6 md:px-24 bg-[#0a0a0a] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        <div className="md:w-1/3">
          <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4">
            Profile Summary
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
            I am a <span className="font-bold text-white">System & Network Administrator</span> specializing in robust IT infrastructure and secure enterprise networking.
          </h2>
        </div>
        
        <div className="md:w-2/3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-neutral-400 font-light text-lg md:text-xl leading-relaxed space-y-6"
          >
            <p>
              I specialize in architecting, managing, and optimizing enterprise IT environments to guarantee maximum uptime, seamless connectivity, and robust network security. My technical depth spans complex firewall administration (Sophos XG), advanced endpoint protection, and proactive infrastructure monitoring.
            </p>
            <p>
              With extensive hands-on experience managing critical network hardware and software deployments across large-scale hospitality and corporate sectors, I excel at transforming complex IT challenges into highly efficient, deeply secure operational foundations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
