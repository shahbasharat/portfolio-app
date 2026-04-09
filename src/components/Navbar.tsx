"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveLink("Home");
    setIsMobileMenuOpen(false);
  };
  
  const handleNavClick = (name: string) => {
    setActiveLink(name);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
          isScrolled 
            ? "bg-transparent border-transparent py-4 drop-shadow-md" 
            : "bg-transparent border-transparent py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Name */}
          <button
            onClick={handleScrollToTop}
            className={`relative group text-2xl font-light tracking-wider z-[110] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto' : 'opacity-100'}`}
          >
            <span className="font-bold text-white transition-all duration-300 group-hover:text-white/80 inline-block">
              Shah
            </span>
          </button>

          {/* Desktop Navigation - Horizontal layout */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 z-[110]">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => handleNavClick(link.name)}
                className="relative px-3 lg:px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors tracking-wide group"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 bg-white/[0.08] rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out z-0" />
                {activeLink === link.name && (
                  <motion.span 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-1 left-4 right-4 h-px bg-white/80 z-10" 
                  />
                )}
              </a>
            ))}
            
            <a
               href="https://v0-basharat.vercel.app/resume"
               target="_blank"
               rel="noopener noreferrer"
               className="ml-2 lg:ml-4 px-5 py-2 text-sm font-medium text-black bg-white border border-white/20 rounded-full hover:bg-neutral-200 transition-all duration-300 font-semibold"
            >
              Resume
            </a>
          </nav>

          {/* Mobile Hover / Staggered Hamburger Menu Toggle */}
          <button
            className={`md:hidden p-2 transition-all duration-300 z-[110] ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <div className="flex flex-col gap-[6px] items-start justify-center w-8 cursor-pointer select-none group">
              <div className="h-[3px] bg-white w-6 group-hover:w-8 transition-all duration-300 rounded-full" />
              <div className="h-[3px] bg-white w-8 transition-all duration-300 rounded-full" />
              <div className="h-[3px] bg-white w-4 group-hover:w-8 transition-all duration-300 rounded-full" />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Slide-in Overlay Menu Drawer for Mobile (Using the photo reference style!) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] md:hidden flex justify-end bg-black/60 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on clicking inside menu
              className="w-full max-w-sm bg-[#050505] border-l border-white/10 h-full shadow-2xl relative flex flex-col pt-16 px-12 pb-12 overflow-y-auto"
            >
              {/* Close Button top-left aligned */}
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="self-start mb-12 text-white hover:rotate-90 hover:text-neutral-400 transition-all duration-300"
              >
                <X size={44} strokeWidth={1.5} />
              </button>

              {/* Huge Bold Navigation Links (Photo Reference) */}
              <nav className="flex flex-col items-start gap-1">
                {navLinks.map((link) => {
                  const isActive = activeLink === link.name;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        handleNavClick(link.name);
                      }}
                      className={`text-[2.75rem] font-black uppercase tracking-[0.02em] leading-[1.2] transition-all duration-300 group flex items-center gap-4 ${
                        isActive 
                          ? "text-white"
                          : "text-neutral-600 hover:text-neutral-300"
                      }`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div 
                          layoutId="activeDarkIndicatorStr"
                          className="w-3 h-3 bg-white rounded-full ml-2"
                        />
                      )}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-auto pt-16">
                <a
                  href="https://v0-basharat.vercel.app/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 text-sm tracking-[0.2em] font-bold text-black bg-white hover:bg-neutral-200 rounded-full transition-all duration-300 text-center w-full shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  DOWNLOAD RESUME
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
