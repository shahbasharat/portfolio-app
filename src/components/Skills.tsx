"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import {
  Network, Shield, Cpu, Settings,
  Layers, Globe, Wifi, Server, Radio,
  ShieldCheck, ShieldAlert, Key, Smartphone, Eye,
  LayoutTemplate, Terminal, Users, Crosshair,
  Wrench, Signal, Database, PhoneCall
} from "lucide-react";

const skillCategories = [
  {
    title: "Networking",
    icon: <Network className="w-5 h-5" />,
    skills: [
      { name: "OSI Model", icon: <Layers className="w-3.5 h-3.5" /> },
      { name: "TCP/IP", icon: <Globe className="w-3.5 h-3.5" /> },
      { name: "LAN/WAN", icon: <Wifi className="w-3.5 h-3.5" /> },
      { name: "DNS", icon: <Server className="w-3.5 h-3.5" /> },
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

const ALL = "All";

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState(ALL);
  const [search, setSearch] = useState("");

  const filters = [ALL, ...skillCategories.map((c) => c.title)];

  const filtered = useMemo(() => {
    return skillCategories
      .filter((cat) => activeFilter === ALL || cat.title === activeFilter)
      .map((cat) => ({
        ...cat,
        skills: cat.skills.filter((s) =>
          s.name.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((cat) => cat.skills.length > 0);
  }, [activeFilter, search]);

  return (
    <section id="skills" className="relative w-full py-24 px-6 md:px-24 bg-[#0a0a0a] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-12">
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

        {/* Filter Pills + Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center justify-between">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
                  activeFilter === f
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills..."
              className="w-full pl-8 pr-4 py-2 bg-black/50 border border-white/10 rounded-full text-xs text-white font-mono placeholder-neutral-600 focus:outline-none focus:border-blue-500/40 transition-all"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-neutral-500 font-mono text-sm"
            >
              No skills match "{search}". Try a different search term.
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filtered.map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-neutral-900 border border-white/[0.05] p-8 rounded-2xl hover:bg-neutral-800/80 transition-colors duration-500 group"
                >
                  <div className="flex items-center gap-3 mb-6 text-white group-hover:text-blue-400 transition-colors duration-500">
                    {category.icon}
                    <h3 className="text-xl font-medium">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-black/40 border border-white/10 rounded-full text-neutral-300 group-hover:border-white/20 transition-colors duration-500"
                      >
                        <span className="text-neutral-500 group-hover:text-blue-400 transition-colors duration-500">
                          {skill.icon}
                        </span>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}