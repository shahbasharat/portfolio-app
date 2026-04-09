"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CompanyTicker() {
  const companies = [
    { name: "The Khyber Resort", imagePath: "/khyber.png" },
    { name: "Skyview by Empyrean", imagePath: "/skyview by empyrean.png" },
    { name: "iSON Xperiences", imagePath: "/ison.png" },
    { name: "e&", imagePath: "/eand.png" },
  ];

  return (
    <section className="relative w-full py-16 bg-gradient-to-b from-black to-[#0a0a0a] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2">
          Trusted by Brands I've Helped Shape
        </h3>
      </div>

      <div 
        className="flex w-full overflow-hidden"
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' 
        }}
      >
        <motion.div 
          className="flex w-fit whitespace-nowrap items-center hover:[animation-play-state:paused]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...companies, ...companies, ...companies, ...companies].map((company, idx) => (
            <div key={idx} className="flex items-center gap-4 mx-12 md:mx-20 group cursor-pointer text-white/50 hover:text-white transition-colors duration-500">
              <Image
                src={company.imagePath}
                alt={`${company.name} Logo`}
                width={120}
                height={40}
                className={`h-10 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-500 ${
                  company.name === 'e&' 
                    ? 'invert grayscale contrast-200 mix-blend-screen' 
                    : 'brightness-0 invert'
                }`}
              />
              <span className="text-xl md:text-3xl font-bold tracking-tight">{company.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
