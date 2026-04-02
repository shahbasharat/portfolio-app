"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Network, Shield, Cpu, Settings,
  Layers, Globe, Wifi, Search, Server, Radio,
  ShieldCheck, ShieldAlert, Key, Smartphone, Eye,
  LayoutTemplate, Terminal, Users, Crosshair,
  Wrench, Signal, Database, PhoneCall
} from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Networking",
      icon: <Network className="w-5 h-5" />,
      skills: [
        { name: "OSI Model", icon: <Layers className="w-3.5 h-3.5" /> },
        { name: "TCP/IP", icon: <Globe className="w-3.5 h-3.5" /> },
        { name: "LAN/WAN", icon: <Wifi className="w-3.5 h-3.5" /> },
        { name: "DNS", icon: <Search className="w-3.5 h-3.5" /> },
        { name: "DHCP", icon: <Server className="w-3.5 h-3.5" /> },
        { name: "Ruckus", icon: <Radio className="w-3.5 h-3.5" /> }
      ]
    },
    {
      title: "Security",
      icon: <Shield className="w-5 h-5" />,
      skills: [
        { name: "Endpoint Protection", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
        { name: "Sophos Firewall", icon: <ShieldAlert className="w-3.5 h-3.5" /> },
        { name: "Site-to-Site VPN", icon: <Key className="w-3.5 h-3.5" /> },
        { name: "Captive Portals", icon: <Smartphone className="w-3.5 h-3.5" /> },
        { name: "IDS/IPS", icon: <Eye className="w-3.5 h-3.5" /> }
      ]
    },
    {
      title: "Tools & Systems",
      icon: <Cpu className="w-5 h-5" />,
      skills: [
        { name: "Windows Server", icon: <LayoutTemplate className="w-3.5 h-3.5" /> },
        { name: "Linux (Ubuntu/Kali)", icon: <Terminal className="w-3.5 h-3.5" /> },
        { name: "Active Directory", icon: <Users className="w-3.5 h-3.5" /> },
        { name: "Seqrite EDR", icon: <Crosshair className="w-3.5 h-3.5" /> },
        { name: "SG5 Antlab", icon: <Server className="w-3.5 h-3.5" /> }
      ]
    },
    {
      title: "IT Support",
      icon: <Settings className="w-5 h-5" />,
      skills: [
        { name: "Troubleshooting", icon: <Wrench className="w-3.5 h-3.5" /> },
        { name: "Wi-Fi Config", icon: <Signal className="w-3.5 h-3.5" /> },
        { name: "Backup & Recovery", icon: <Database className="w-3.5 h-3.5" /> },
        { name: "Avaya CRM", icon: <PhoneCall className="w-3.5 h-3.5" /> }
      ]
    }
  ];

  return (
    <section id="skills" className="relative w-full py-24 px-6 md:px-24 bg-[#0a0a0a] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4"
          >
            Technical Arsenal
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light"
          >
            Core <span className="font-bold text-white">Skills.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-neutral-900 border border-white/[0.05] p-8 rounded-2xl hover:bg-neutral-800/80 transition-colors duration-500 group"
            >
              <div className="flex items-center gap-3 mb-6 text-white group-hover:text-blue-400 transition-colors duration-500">
                {category.icon}
                <h3 className="text-xl font-medium">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.15 + sIdx * 0.05 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-black/40 border border-white/10 rounded-full text-neutral-300 group-hover:border-white/20 transition-colors duration-500"
                  >
                    <span className="text-neutral-500 group-hover:text-blue-400 transition-colors duration-500">
                      {skill.icon}
                    </span>
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}