import React from "react";
import { GraduationCap, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Education() {
  const education = [
    {
      degree: "Bachelors of Computer Applications",
      institution: "University of Kashmir",
      time: "May 2024",
    },
    {
      degree: "One Year Diploma in Computer Applications",
      institution: "NIELIT",
      time: "Dec 2020",
    },
    {
      degree: "Senior Secondary (12th Grade)",
      institution: "JKBOSE",
      time: "March 2019",
    }
  ];

  return (
    <section id="education" className="relative w-full py-24 px-6 md:px-24 bg-[#0a0a0a] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">

        {/* Education Column */}
        <div className="lg:w-1/2">
          <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-8 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-white" /> Academic Background
          </h3>

          <div className="space-y-8">
            {education.map((edu, idx) => (
              <div key={idx} className="group border-l border-white/10 pl-6 hover:border-white/40 transition-colors duration-300">
                <h4 className="text-xl font-medium text-white/90">{edu.degree}</h4>
                <div className="text-neutral-400 mt-1">{edu.institution}</div>
                <div className="text-neutral-600 text-sm mt-2">{edu.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Redirect Column */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="bg-[#0f0f0f] border border-white/[0.05] p-10 md:p-16 rounded-3xl text-center flex flex-col items-center justify-center hover:bg-[#111111] transition-all duration-500 group shadow-2xl relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-all duration-500" />
            
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500 relative z-10">
              <Award className="w-10 h-10 text-blue-400" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-light text-white mb-4 relative z-10">
              Certifications & Achievements
            </h3>
            
            <p className="text-neutral-400 max-w-sm mb-10 relative z-10">
              I have actively expanded my cybersecurity and IT knowledge through extensive hands-on labs and enterprise training.
            </p>
            
            <Link 
              href="/certifications"
              className="px-8 py-4 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:bg-neutral-200 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] group/btn relative z-10"
            >
              View All Certificates
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
