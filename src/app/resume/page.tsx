"use client";
import React, { useEffect } from "react";
import { Printer, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  useEffect(() => {
    document.body.style.cursor = "auto";
    return () => {
      document.body.style.cursor = "none";
    };
  }, []);

  return (
   <main className="resume-page min-h-screen bg-white text-black">

      {/* Action Bar - hidden when printing */}
      <div className="print:hidden fixed top-0 left-0 right-0 z-50 bg-black text-white px-4 md:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        <div className="flex items-center gap-3">
          <a href="/resume.pdf" download className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors">
            <Download className="w-4 h-4" />
            Download PDF
          </a>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="pt-16 print:pt-0 max-w-4xl mx-auto px-6 md:px-12 py-12 print:py-6">

        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-1">Basharat Salam</h1>
          <p className="text-gray-600 text-base md:text-lg mb-3">System & Network Administrator</p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span>Srinagar, Jammu & Kashmir</span>
            <span>shahbasharat577@gmail.com</span>
            <span>v0-basharat.vercel.app</span>
            <span>+91 7006271979</span>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Profile Summary</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Technical Support Specialist with a strong background in IT and network administration. Skilled in troubleshooting hardware, software, and network issues to ensure system reliability and user satisfaction. Experienced in endpoint management, VPN configuration, and firewall administration.
          </p>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Work Experience</h2>
          <div className="space-y-5">
            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
                <h3 className="font-semibold text-black">Executive Information Technology</h3>
                <span className="text-gray-500 text-sm">Aug 2025 - Present</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">The Khyber Himalayan Resort & Spa · Gulmarg, J&K</p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>Performed daily IT operations and system monitoring including health checks and backups.</li>
                <li>Managed wired and wireless network infrastructure using Ruckus access points and switches.</li>
                <li>Handled user account and access management through Active Directory.</li>
                <li>Provided technical support for hospitality systems including Wi-Fi portals and POS systems.</li>
              </ul>
            </div>
            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
                <h3 className="font-semibold text-black">Executive Information Technology</h3>
                <span className="text-gray-500 text-sm">Mar 2025 - Aug 2025</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">Skyview by Empyrean · Srinagar, J&K</p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>Administered and secured corporate networks using Sophos firewall and IDS/IPS monitoring.</li>
                <li>Managed Seqrite EDR platform for enterprise endpoint protection.</li>
                <li>Oversaw Ruckus switch controllers and ANTlabs Wi-Fi gateways.</li>
                <li>Conducted daily security monitoring and alert triage from EDR and firewall logs.</li>
              </ul>
            </div>
            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
                <h3 className="font-semibold text-black">Technical Advisor</h3>
                <span className="text-gray-500 text-sm">Jan 2024 - Feb 2025</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">Ison Xperience (Client: Etisalat) · Bengaluru, India</p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>Resolved customer complaints related to Wi-Fi and internet services for labor camp users.</li>
                <li>Provided Wi-Fi setup, troubleshooting, and support for large-scale accommodations.</li>
                <li>Diagnosed signal strength, bandwidth distribution, and user isolation issues.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-semibold text-black">Networking: </span>
              <span className="text-gray-600">OSI Model, TCP/IP, LAN/WAN, DNS, DHCP, Ruckus</span>
            </div>
            <div>
              <span className="font-semibold text-black">Security: </span>
              <span className="text-gray-600">Sophos Firewall, Endpoint Protection, Site-to-Site VPN, IDS/IPS</span>
            </div>
            <div>
              <span className="font-semibold text-black">Systems: </span>
              <span className="text-gray-600">Windows Server, Linux (Ubuntu/Kali), Active Directory, Seqrite EDR</span>
            </div>
            <div>
              <span className="font-semibold text-black">IT Support: </span>
              <span className="text-gray-600">Troubleshooting, Wi-Fi Config, Backup & Recovery, Avaya CRM</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Certifications</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex flex-col md:flex-row md:justify-between"><span>Cisco Certified Network Associate Security (CCNA)</span><span className="text-gray-400">Dec 2024</span></li>
            <li className="flex flex-col md:flex-row md:justify-between"><span>SOC Fundamentals — LetsDefend</span><span className="text-gray-400">May 2025</span></li>
            <li className="flex flex-col md:flex-row md:justify-between"><span>Pre-Security Path — TryHackMe</span><span className="text-gray-400">Apr 2025</span></li>
            <li className="flex flex-col md:flex-row md:justify-between"><span>Deloitte Australia Cyber Security Simulation</span><span className="text-gray-400">Dec 2025</span></li>
            <li className="flex flex-col md:flex-row md:justify-between"><span>Google Cybersecurity Certificate</span><span className="text-gray-400">Expected Jan 2026</span></li>
          </ul>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Education</h2>
          <div className="space-y-3 text-sm">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <p className="font-semibold text-black">Bachelors of Computer Applications</p>
                <p className="text-gray-600">University of Kashmir</p>
              </div>
              <span className="text-gray-400">May 2024</span>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <p className="font-semibold text-black">One Year Diploma in Computer Applications</p>
                <p className="text-gray-600">NIELIT</p>
              </div>
              <span className="text-gray-400">Dec 2020</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="print:block hidden border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
          v0-basharat.vercel.app · shahbasharat577@gmail.com
        </div>

      </div>
    </main>
  );
}
