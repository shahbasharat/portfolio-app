"use client";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import CompanyTicker from "@/components/CompanyTicker";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import NetworkTopology from "@/components/NetworkTopology";
import SocMonitor from "@/components/SocMonitor";
import VulnerabilityScanner from "@/components/VulnerabilityScanner";
import AdForensicsSuite from "@/components/AdForensicsSuite";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import StatsCounter from "@/components/StatsCounter";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <div className="relative h-[500vh]">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <div className="relative z-20 bg-black">
        <CompanyTicker />
        <StatsCounter />
        <About />
        <Experience />
        <Skills />
        <NetworkTopology />
        <SocMonitor />
        <VulnerabilityScanner />
        <AdForensicsSuite />
        <Projects />
        <Testimonials />
        <Education />
        <Contact />
      </div>
    </main>
  );
}
