"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      id: 1,
      role: "Executive Information Technology",
      company: "The Khyber Himalayan Resort & Spa",
      location: "Gulmarg, J&K",
      date: "Aug 2025 - Present",
      bullets: [
        "Performed daily IT operations and system monitoring (health checks, backups, uptime tracking).",
        "Managed wired and wireless network infrastructure (Ruckus access points, switches, controllers).",
        "Handled user account and access management through Active Directory.",
        "Provided technical support for hospitality systems (Wi-Fi portals, POS systems)."
      ]
    },
    {
      id: 2,
      role: "Executive Information Technology",
      company: "Skyview by Empyrean",
      location: "Srinagar, J&K",
      date: "Mar 2025 - Aug 2025",
      bullets: [
        "Administered and secured corporate networks using Sophos firewall and IDS/IPS monitoring.",
        "Managed Seqrite Endpoint Detection & Response (EDR) platform for enterprise protection.",
        "Oversaw Ruckus switch controllers and ANTlabs Wi-Fi gateways.",
        "Analyzed security events and triaged alerts from EDR and firewall logs."
      ]
    },
    {
      id: 3,
      role: "Technical Advisor",
      company: "Ison Xperience (Client: Etisalat)",
      location: "Bengaluru, India",
      date: "Jan 2024 - Feb 2025",
      bullets: [
        "Resolved customer complaints related to Wi-Fi and internet services for labor camp users.",
        "Provided Wi-Fi setup, troubleshooting, and support for large-scale shared accommodations.",
        "Diagnosed signal strength, bandwidth distribution, and user isolation issues."
      ]
    }
  ];

  return (
    <section id="experience" className="relative w-full py-20 md:py-24 px-6 md:px-24 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 md:mb-16">
          <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Professional Journey
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light">
            Career <span className="font-bold text-white">Experience.</span>
          </h2>
        </div>

        <div className="space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-6 md:pl-0"
            >
              {/* Timeline Connector */}
              <div className="hidden md:block absolute left-[150px] top-0 bottom-[-48px] w-px bg-white/10 last:bg-transparent" />
              <div className="hidden md:block absolute left-[146px] top-2 w-[9px] h-[9px] rounded-full ring-4 ring-black bg-neutral-400" />
              
              <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                <div className="md:w-[130px] flex-shrink-0 pt-1 text-blue-400 md:text-neutral-500 uppercase tracking-widest text-xs md:text-sm font-semibold md:font-medium">
                  {exp.date}
                </div>
                
                <div className="flex-1 bg-neutral-900 border border-white/[0.05] hover:border-white/[0.15] transition-colors p-6 md:p-8 rounded-2xl relative group overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-1.5">{exp.role}</h3>
                    <h4 className="text-base md:text-lg text-neutral-400 mb-6 font-medium">{exp.company} <span className="text-neutral-600 text-sm ml-2 font-light">| {exp.location}</span></h4>
                    
                    <ul className="space-y-3 text-neutral-400 font-light text-sm md:text-base leading-relaxed">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-blue-500/50 mt-1">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
