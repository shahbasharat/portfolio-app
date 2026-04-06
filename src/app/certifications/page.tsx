"use client";
import React from "react";
import { Award, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Certifications() {
  type Certification = { title: string; date: string; desc: string; link?: string };
  const certifications: Certification[] = [
    { title: "Google Cybersecurity Certificate", date: "Expected Jan 2026", desc: "SIEM, IDS/IPS, logging, phishing analysis, and network security concepts.", link: "https://www.coursera.org/professional-certificates/google-cybersecurity" },
    { title: "Deloitte Australia Cyber Security Simulation", date: "Dec 2025", desc: "Log analysis, anomaly detection, and incident response.", link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_69343bfa187d49737fe6d837_1765032736416_completion_certificate.pdf" },
    { title: "SOC Fundamentals — LetsDefend", date: "May 2025", desc: "Threat monitoring, alert analysis, and SIEM fundamentals with hands-on investigations.", link: "https://app.letsdefend.io/my-rewards/detail/525ae7eebe0348739aa9bfb18b713d90" },
    { title: "Pre-Security Path — TryHackMe", date: "Apr 2025", desc: "Cybersecurity fundamentals, OSI model, vulnerabilities, and Linux essentials.", link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-1BTA7J4ZR2.pdf" },
    { title: "TryHackMe Cybersecurity Training", date: "Apr 2025 - Present", desc: "Hands-on labs in Linux, web security, and threat detection.", link: "https://tryhackme.com/p/sbasharat577" },
    { title: "Cisco Certified Network Associate Security (CCNA)", date: "Dec 2024", desc: "Device hardening, secure network design, VPN, and firewall fundamentals.", link: "https://drive.google.com/file/d/1CgWkiPgp339gQwJ-h_EJs8zII49aWgCU/view" },
    { title: "Google Cloud Skill Badge", date: "Oct 2022", desc: "Hands-on experience with compute, IAM, storage, and networking.", link: "https://www.skills.google/public_profiles/324666f0-7a1f-49e4-abb7-3a26a9da505e" },
    { title: "Introduction to Cybersecurity", date: "Oct 2022", desc: "Cisco fundamentals of threat landscape and network protection.", link: "https://www.credly.com/badges/317859ab-9a91-44f8-a7d8-1d68d3219fc9/linked_in_profile" }
  ];

  return (
    <main className="min-h-screen bg-black text-white relative py-24 px-4 md:px-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-blue-900/20 to-transparent blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">

        <Link href="/#education" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-12 transition-colors group cursor-pointer font-medium tracking-wide">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        <div className="mb-12 md:mb-20">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-6xl font-light mb-6 flex items-center gap-3 flex-wrap">
            <Award className="w-8 h-8 md:w-14 md:h-14 text-blue-500 shrink-0" />
            <span><span className="font-bold">Certifications</span> & Achievements</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-neutral-400 text-base md:text-xl max-w-3xl font-light leading-relaxed">
            A comprehensive overview of my cybersecurity training, professional certifications, and practical job simulations reinforcing my technical expertise.
          </motion.p>
        </div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-16">
          {certifications.map((cert, idx) => {
            const CardContent = (
              <>
                <div className="flex flex-col gap-3 mb-4">
                  <span className="inline-block self-start text-xs text-blue-400 font-mono tracking-wider bg-blue-900/20 border border-blue-500/20 px-3 py-1.5 rounded-full">
                    {cert.date}
                  </span>
                  <h4 className="text-lg md:text-2xl text-white font-medium group-hover:text-blue-400 transition-colors leading-tight">
                    {cert.title}
                    {cert.link && <ExternalLink className="inline w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />}
                  </h4>
                </div>
                <p className="text-neutral-400 text-sm md:text-lg leading-relaxed group-hover:text-neutral-300 transition-colors font-light">
                  {cert.desc}
                </p>
              </>
            );
            return (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: idx * 0.05 }} key={idx} className="h-full">
                {cert.link ? (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="block h-full bg-[#0d0d0d] border border-white/[0.05] p-6 md:p-10 rounded-3xl hover:bg-[#151515] hover:border-blue-500/40 transition-all duration-500 group cursor-pointer shadow-lg hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">{CardContent}</div>
                  </a>
                ) : (
                  <div className="h-full bg-[#0d0d0d] border border-white/[0.05] p-6 md:p-10 rounded-3xl hover:bg-[#151515] hover:border-white/20 transition-all duration-500 group shadow-lg relative overflow-hidden">
                    <div className="relative z-10">{CardContent}</div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* TryHackMe Badge Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-t border-white/[0.05] pt-12"
        >
          <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6">
            Live Training Profile
          </h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 bg-[#0d0d0d] border border-white/[0.05] p-6 md:p-10 rounded-3xl">

            {/* THM Badge */}
            <div className="shrink-0">
              <a href="https://tryhackme.com/p/sbasharat577" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://tryhackme-badges.s3.amazonaws.com/sbasharat577.png"
                  alt="TryHackMe Badge"
                  className="w-48 md:w-56 rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-mono">Active Learner</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">TryHackMe — sbasharat577</h3>
              <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed mb-4">
                Actively completing hands-on cybersecurity labs and CTF-style challenges. Practicing real-world skills across networking, Linux, web security, and threat detection.
              </p>
              
                href="https://tryhackme.com/p/sbasharat577"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                View Profile <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
