"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown } from "lucide-react";

export default function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const experiences = [
    {
      id: 1,
      role: "Executive Information Technology",
      company: "The Khyber Himalayan Resort & Spa",
      location: "Gulmarg, J&K",
      date: "Aug 2025 - Present",
      bullets: [
        "Performed daily IT operations and system monitoring including server health checks, scheduled backups, and uptime tracking to ensure smooth resort operations.",
        "Managed wired and wireless network infrastructure by monitoring Ruckus access points, switches, and the Antlab SG5 Gateway, ensuring uninterrupted guest and staff connectivity.",
        "Configured and maintained Sophos Firewall for secure VPN access, bandwidth management, and implementation of network security policies.",
        "Administered Seqrite Endpoint Detection & Response (EDR) by enforcing web policies, monitoring alerts, and maintaining endpoint protection compliance across all systems.",
        "Handled user account and access management through Active Directory, including password resets, permissions, and group policy configurations.",
        "Provided technical support for hospitality systems such as Wi-Fi portals, POS systems, and administrative workstations, ensuring high availability for guests and staff.",
        "Maintained IT documentation and incident reports including daily backup logs, network status updates, and service records for audits and performance reviews."
      ]
    },
    {
      id: 2,
      role: "Executive Information Technology",
      company: "Skyview by Empyrean",
      location: "Srinagar, J&K",
      date: "Mar 2025 - Aug 2025",
      bullets: [
        "Administered and secured the corporate network by managing the Sophos firewall, monitoring Intrusion Detection/Prevention Systems (IDS/IPS), and overseeing the Seqrite Endpoint Detection & Response (EDR) platform.",
        "Oversaw all wired and wireless network infrastructure, including Ruckus switch controllers and the ANTlabs Wi-Fi gateway, ensuring seamless connectivity for employees and guests.",
        "Ensured business continuity and data integrity by performing daily backups of all critical servers and maintaining the security and performance of employee endpoints.",
        "Provided comprehensive 24/7 IT operational support in a luxury hospitality environment, maintaining high system uptime and rapidly resolving technical issues.",
        "Conducted daily security monitoring and alert triage, analyzing events from the EDR and firewall logs to identify and respond to potential threats."
      ]
    },
    {
      id: 3,
      role: "Technical Advisor",
      company: "Ison Xperience (Client: Etisalat)",
      location: "Bengaluru, India",
      date: "Jan 2024 - Feb 2025",
      bullets: [
        "Handled customer complaints and connectivity issues related to WiFi and internet service for Etisalat labor camp users.",
        "Provided WiFi setup, troubleshooting, and support for large-scale shared accommodations across labour camps.",
        "Diagnosed issues related to signal strength, bandwidth distribution, and user isolation in multi-user environments.",
        "Assisted non-technical users in configuring WiFi-enabled devices and delivered multilingual support as needed.",
        "Configured and reset routers, resolved modem issues, and guided users in basic access control practices.",
        "Collaborated with Etisalat backend teams to escalate complex issues and track resolution timelines.",
        "Consistently achieved service-level targets for ticket handling, technical resolution, and customer satisfaction."
      ]
    }
  ];

  return (
    <section id="experience" className="relative w-full py-20 md:py-24 px-4 md:px-24 bg-[#0a0a0a]">
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
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            const visibleBullets = exp.bullets.slice(0, 2);
            const hiddenBullets = exp.bullets.slice(2);

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-0"
              >
                <div className="hidden md:block absolute left-[150px] top-0 bottom-[-48px] w-px bg-white/10" />
                <div className="hidden md:block absolute left-[146px] top-2 w-[9px] h-[9px] rounded-full ring-4 ring-black bg-neutral-400" />

                <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                  <div className="md:w-[130px] flex-shrink-0 pt-1 text-blue-400 md:text-neutral-500 uppercase tracking-widest text-xs md:text-sm font-semibold md:font-medium">
                    {exp.date}
                  </div>

                  <div
                    className="flex-1 bg-neutral-900 border border-white/[0.05] hover:border-white/[0.15] transition-all duration-500 p-6 md:p-8 rounded-2xl relative group overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4 mb-1.5">
                        <h3 className="text-xl md:text-2xl font-semibold text-white">{exp.role}</h3>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0 mt-1"
                        >
                          <ChevronDown className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                        </motion.div>
                      </div>

                      <h4 className="text-base md:text-lg text-neutral-400 mb-6 font-medium">
                        {exp.company}
                        <span className="text-neutral-600 text-sm ml-2 font-light">| {exp.location}</span>
                      </h4>

                      <ul className="space-y-3 text-neutral-400 font-light text-sm md:text-base leading-relaxed">
                        {visibleBullets.map((b, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="text-blue-500/50 mt-1 shrink-0">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3 text-neutral-400 font-light text-sm md:text-base leading-relaxed mt-3 overflow-hidden"
                          >
                            {hiddenBullets.map((b, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-3"
                              >
                                <span className="text-blue-500/50 mt-1 shrink-0">•</span>
                                <span>{b}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>

                      {hiddenBullets.length > 0 && (
                        <p className="text-xs text-neutral-600 mt-4 group-hover:text-neutral-400 transition-colors">
                          {isExpanded ? "Click to collapse" : `+ ${hiddenBullets.length} more — click to expand`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}