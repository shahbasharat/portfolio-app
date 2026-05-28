"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects, Project } from "@/data/projects";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="projects" className="relative w-full min-h-screen px-6 py-24 md:px-24 bg-[#0a0a0a]">
      {/* Subtle light overlay from top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4">
            Selected Works
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light">
            Recent <span className="font-bold text-white">Projects.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => {
            const isExternal = !!proj.externalLink;
            
            return (
              <div
                key={proj.id}
                onClick={() => {
                  if (isExternal && proj.externalLink) {
                    window.open(proj.externalLink, "_blank", "noopener,noreferrer");
                  } else {
                    setSelectedProject(proj);
                  }
                }}
                className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl p-8 min-h-[400px] bg-neutral-900 border border-white/[0.05] transition-all duration-700 hover:border-white/[0.15] cursor-pointer ${proj.span}`}
              >
                {/* Glassmorphism gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                
                {/* Background Image */}
                {proj.imagePath && (
                  <Image 
                    src={proj.imagePath} 
                    alt={proj.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="absolute inset-0 object-cover opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 z-0 pointer-events-none"
                  />
                )}

                {/* Content */}
                <div className="relative z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2 flex-wrap">
                      {proj.tags.map(t => (
                        <span key={t} className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-neutral-300 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="p-3 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <h4 className="text-3xl font-semibold mb-2 text-white/90 group-hover:text-white transition-colors duration-300">
                    {proj.title}
                  </h4>
                  <p className="text-neutral-400 font-light text-lg">
                    {proj.desc}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none rounded-2xl p-[1px] bg-gradient-to-br from-white/20 to-transparent mix-blend-overlay" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-out side drawer details view */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex justify-end"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on click inside
              className="w-full max-w-2xl bg-[#080808] border-l border-white/10 h-full shadow-2xl relative flex flex-col p-8 md:p-12 overflow-y-auto"
            >
              {/* Drawer Controls */}
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest"
                >
                  <X className="w-5 h-5" />
                  Close Panel
                </button>
                {selectedProject.externalLink && (
                  <a
                    href={selectedProject.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-blue-400 hover:text-blue-300 font-mono transition-colors"
                  >
                    View Live <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                {selectedProject.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-medium font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                {selectedProject.title}
              </h3>

              {/* Image Preview */}
              {selectedProject.imagePath && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 mb-8 bg-neutral-900">
                  <Image
                    src={selectedProject.imagePath}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover opacity-80"
                  />
                </div>
              )}

              {/* Case Study Details */}
              <div className="flex-1 space-y-8 font-light text-neutral-300 text-sm md:text-base leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2.5">Project Overview</h4>
                  <p className="text-neutral-300 font-light leading-relaxed">{selectedProject.longDesc}</p>
                </div>
                
                {selectedProject.challenge && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2.5">The Challenge</h4>
                    <p className="text-neutral-300 font-light leading-relaxed">{selectedProject.challenge}</p>
                  </div>
                )}

                {selectedProject.implementation && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2.5">Deployment & Architecture</h4>
                    <p className="text-neutral-300 font-light leading-relaxed whitespace-pre-wrap">{selectedProject.implementation}</p>
                  </div>
                )}

                {selectedProject.outcome && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2.5">Security & operational Outcome</h4>
                    <p className="text-neutral-300 font-light leading-relaxed">{selectedProject.outcome}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
