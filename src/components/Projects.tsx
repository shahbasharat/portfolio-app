import React from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

export default function Projects() {
  // Projects are now loaded via centralized schema

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
            const Component = proj.externalLink ? "a" : Link;
            return (
            <Component
              key={proj.id}
              href={proj.externalLink ? proj.externalLink : `/projects/${proj.slug}`}
              target={proj.externalLink ? "_blank" : undefined}
              rel={proj.externalLink ? "noopener noreferrer" : undefined}
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
            </Component>
            );
          })}
        </div>
      </div>
    </section>
  );
}
