"use client";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <div className="relative h-[500vh]">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <div className="relative z-20 bg-black">
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </div>
    </main>
  );
}
