"use client";

import React, { useState } from "react";
import { Mail, Phone, Linkedin, Github, ShieldCheck, Loader2, CheckCircle, Download } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error(error);
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "Email",
      value: "sbasharat577@gmail.com",
      link: "mailto:sbasharat577@gmail.com",
      icon: <Mail className="w-5 h-5" />
    },
    {
      name: "WhatsApp",
      value: "+91 7006271979",
      link: "https://wa.me/917006271979",
      icon: <Phone className="w-5 h-5" />
    },
    {
      name: "LinkedIn",
      value: "/basharatsalam",
      link: "https://www.linkedin.com/in/basharatsalam",
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      name: "GitHub",
      value: "shahbasharat",
      link: "https://github.com/shahbasharat",
      icon: <Github className="w-5 h-5" />
    }
  ];

  return (
    <footer id="contact" className="relative w-full py-32 px-6 md:px-24 bg-[#0a0a0a] border-t border-white/[0.05] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-gradient-to-b from-blue-900/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24">
        
        {/* Left Column: Text & Info */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-sm uppercase tracking-[0.2em] text-blue-400 font-mono mb-6">
            Contact
          </h2>
          
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-8 md:mb-12 leading-tight">
            Looking for a dedicated <span className="font-bold text-white">IT Administrator</span> to secure your infrastructure? Let's connect.
          </h3>
          
          <div className="space-y-4 text-lg font-light">
            <p className="text-neutral-400">Srinagar Jammu and Kashmir</p>
            <p>
              <a href="mailto:shahbasharat577@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                shahbasharat577@gmail.com
              </a>
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 md:gap-6">
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-full font-medium transition-all border border-blue-500/20 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
            
            <a 
              href="https://www.linkedin.com/in/basharatsalam/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/shahbasharat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Column: Glassmorphism Form OR Success Message */}
        <div className="w-full lg:w-1/2">
          
          {formStatus === "success" ? (
            <div className="bg-neutral-900 border border-white/[0.05] p-12 md:p-16 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 min-h-[440px]">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-3xl font-light text-white mb-4">Message Sent!</h3>
              <p className="text-neutral-400 text-lg">
                Thank you for reaching out. I'll review your query and get back to you shortly.
              </p>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit}
              className="bg-neutral-900 border border-white/[0.05] p-8 md:p-10 rounded-3xl space-y-6 shadow-2xl relative"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  aria-label="Your Name"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50 focus:bg-black/80 transition-all font-light disabled:opacity-50"
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Youremail@email.com" 
                  aria-label="Your Email Address"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50 focus:bg-black/80 transition-all font-light disabled:opacity-50"
                />
              </div>
              
              <textarea 
                name="message"
                placeholder="Message..." 
                aria-label="Your Message"
                required
                rows={6}
                disabled={isSubmitting}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50 focus:bg-black/80 transition-all font-light resize-none disabled:opacity-50"
              />
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.2)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending securely...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {formStatus === "error" && (
                <p className="text-red-400 text-sm text-center mt-4">
                  There was an error sending the message. Please ensure the server has correct SMTP configurations.
                </p>
              )}
            </form>
          )}

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 max-w-7xl mx-auto mt-32 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-600 font-light">
  <p>© {new Date().getFullYear()} Basharat Salam. All rights reserved.</p>
  <p className="text-neutral-600 text-xs font-mono">
    Last updated: April 2026
  </p>
  <p className="flex items-center gap-2 text-neutral-500">
    <ShieldCheck className="w-4 h-4" /> Secured & Monitored
  </p>
</div>
    </footer>
  );
}
