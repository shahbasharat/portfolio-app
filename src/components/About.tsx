"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, ChevronRight } from "lucide-react";
import SshGateway from "./SshGateway";

type LogLine = { type: "input" | "output" | "error"; text: string };

export default function About() {
  const [input, setInput] = useState("");
  
  // Game states
  const [challengeStage, setChallengeStage] = useState(0); // 0 = idle, 1 = started, 2 = log-read, 3 = completed
  const [isHackerTheme, setIsHackerTheme] = useState(false);
  const [isSshOpen, setIsSshOpen] = useState(false);

  const getCommandsList = () => [
    "┌─────────────────────────────────────────┐",
    "│          AVAILABLE COMMANDS             │",
    "├─────────────────────────────────────────┤",
    "│  help        Show this help menu        │",
    "│  skills      List technical skills      │",
    "│  ping        Ping the firewall          │",
    "│  sysinfo     Show system information    │",
    "│  whoami      About Basharat Salam       │",
    `│  challenge   ${isHackerTheme ? "Restart Challenge        " : "Start Security Challenge  "} │`,
    "│  clear       Clear terminal screen      │",
    "└─────────────────────────────────────────┘",
  ];

  const COMMANDS: Record<string, () => string[]> = {
    help: () => [
      "┌─────────────────────────────────────────┐",
      "│          AVAILABLE COMMANDS             │",
      "├─────────────────────────────────────────┤",
      "│  help        Show this help menu        │",
      "│  skills      List technical skills      │",
      "│  ping        Ping the firewall          │",
      "│  sysinfo     Show system information    │",
      "│  whoami      About Basharat Salam       │",
      "│  ssh         Open full-screen shell     │",
      `│  challenge   ${isHackerTheme ? "Restart Challenge        " : "Start Security Challenge  "} │`,
      "│  clear       Clear terminal screen      │",
      "└─────────────────────────────────────────┘",
    ],
    skills: () => [
      "CATEGORY         SKILL                    LEVEL",
      "───────────────────────────────────────────────",
      "Networking    │  OSI Model / TCP/IP        ████████░░  80%",
      "Networking    │  LAN/WAN / DNS / DHCP      ███████░░░  75%",
      "Networking    │  Ruckus (Wi-Fi)            ████████░░  80%",
      "Security      │  Sophos XG Firewall        █████████░  90%",
      "Security      │  Seqrite EDR               █████████░  90%",
      "Security      │  IDS/IPS / VPN             ████████░░  80%",
      "Systems       │  Windows Server / AD DS    ████████░░  82%",
      "Systems       │  Linux (Ubuntu / Kali)     ███████░░░  70%",
      "IT Support    │  Troubleshooting           █████████░  95%",
      "IT Support    │  Avaya CRM / Backup        ████████░░  80%",
    ],
    ping: () => [
      "PING sophos-xg135.local (192.168.1.1): 56 data bytes",
      "64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=1.22ms",
      "64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.98ms",
      "64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=1.05ms",
      "64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=1.11ms",
      "─────────────────────────────────────────",
      "4 packets transmitted, 4 received, 0% packet loss",
      "round-trip min/avg/max = 0.98/1.09/1.22 ms",
      "Status: FIREWALL GATEWAY ONLINE ✓",
    ],
    sysinfo: () => [
      "┌─ SYSTEM INFORMATION ─────────────────────┐",
      "│  Hostname     : BASHARAT-WORKSTATION      │",
      "│  OS           : Windows Server 2022       │",
      "│  Domain       : corp.khyber.local         │",
      "│  AD Status    : Domain Controller Active  │",
      "│  Firewall     : Sophos XG135 (UP)         │",
      "│  EDR Agent    : Seqrite (Compliant)       │",
      "│  VPN Tunnels  : 5 Active (IPSec)          │",
      "│  Uptime       : 47 days, 14 hrs, 32 mins  │",
      "│  CPU Load     : 12% | RAM: 6.2 / 16 GB   │",
      "└──────────────────────────────────────────┘",
    ],
    whoami: () => [
      "┌─ USER PROFILE ───────────────────────────┐",
      "│  Name         : Basharat Salam            │",
      "│  Role         : System & Network Admin    │",
      "│  Location     : Srinagar, J&K, India      │",
      "│  Experience   : Enterprise Hospitality IT │",
      "│  Speciality   : Sophos, EDR, Ruckus, AD   │",
      "│  Certs        : CCNA, SOC, Google Cyber   │",
      "│  Email        : shahbasharat577@gmail.com  │",
      "│  Status       : Open to Opportunities     │",
      "└──────────────────────────────────────────┘",
    ],
  };

  const [log, setLog] = useState<LogLine[]>([
    { type: "output", text: "Welcome to Basharat's System Console v2.0" },
    { type: "output", text: 'Type "help" to see available commands or "challenge" to test your security skills.' },
    { type: "output", text: "─────────────────────────────────────────" },
  ]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [log]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLog: LogLine[] = [
      ...log,
      { type: "input", text: `$ ${cmd}` },
    ];

    // Challenge flow command overrides
    if (challengeStage > 0) {
      if (cmd === "abort") {
        setChallengeStage(0);
        newLog.push({ type: "output", text: "❌ Security challenge aborted. Terminal returned to normal state." });
        setLog(newLog);
        setInput("");
        return;
      }

      if (challengeStage === 1) {
        if (cmd === "cat logs") {
          setChallengeStage(2);
          const logsOutput = [
            "Connection logs for Host WS-102 (Workstation):",
            "─────────────────────────────────────────────────",
            "12:40:02  AD Authentication: user 'frontdesk.admin' - PASS",
            "12:40:15  HTTPS Session - 52.84.120.18 - ESTABLISHED",
            "12:41:00  EDR Block alert: Malware download block triggered.",
            "12:41:01  TCP Connection - 185.220.101.4:443 - ESTABLISHED (High traffic outbound!)",
            "12:41:05  FTP Data Leak - 185.220.101.4:21 - ESTABLISHED",
            "─────────────────────────────────────────────────",
            "Target Found: Suspicious IP is leaking data.",
            "Type 'block 185.220.101.4' to deploy firewall rule."
          ];
          logsOutput.forEach((l) => newLog.push({ type: "output", text: l }));
          setLog(newLog);
          setInput("");
          return;
        } else {
          newLog.push({ type: "error", text: "Invalid command. Type 'cat logs' to analyze the outbound connections, or 'abort'." });
          setLog(newLog);
          setInput("");
          return;
        }
      }

      if (challengeStage === 2) {
        if (cmd === "block 185.220.101.4") {
          setChallengeStage(3);
          setIsHackerTheme(true);
          const completionOutput = [
            "🔒 BLOCK RULE INITIATING...",
            "Deploying firewall block command: sophos-xg system rule add block_ip=185.220.101.4",
            "Injecting EDR isolation policy...",
            "Connection to 185.220.101.4: TERMINATED",
            "─────────────────────────────────────────────────",
            "🎉 INCIDENT RESOLVED successfully! Threat mitigated.",
            "🏆 Achievement Unlocked: Cyber Incident Responder Mode",
            "✓ Hacker Green terminal theme activated.",
            "Type 'help' to audit updated terminal options."
          ];
          completionOutput.forEach((l) => newLog.push({ type: "output", text: l }));
          setLog(newLog);
          setInput("");
          return;
        } else if (cmd.startsWith("block")) {
          newLog.push({ type: "error", text: "Incorrect target IP. Read connection logs using 'cat logs' and choose the correct IP to block." });
          setLog(newLog);
          setInput("");
          return;
        } else {
          newLog.push({ type: "error", text: "Action required: Execute 'block <IP>' to isolate the host and stop data leakage." });
          setLog(newLog);
          setInput("");
          return;
        }
      }
    }

    // Standard CLI Command execution
    if (cmd === "clear") {
      setLog([{ type: "output", text: "Console cleared. Type 'help' for commands." }]);
    } else if (cmd === "ssh") {
      setIsSshOpen(true);
      newLog.push({ type: "output", text: "Opening full-screen SSH Gateway session..." });
      setLog(newLog);
    } else if (cmd === "challenge") {
      setChallengeStage(1);
      const challengeStart = [
        "🚨 INCIDENT RESPONSE INITIATED!",
        "─────────────────────────────────────────────────",
        "Threat Alert: Host WS-102 (Frontdesk POS workstation)",
        "reported unusual high-volume outbound traffic.",
        "Your task: Inspect connections to identify the malicious IP.",
        "Type 'cat logs' to begin log auditing."
      ];
      challengeStart.forEach((l) => newLog.push({ type: "output", text: l }));
      setLog(newLog);
    } else if (COMMANDS[cmd]) {
      const lines = COMMANDS[cmd]();
      lines.forEach((l) => newLog.push({ type: "output", text: l }));
      setLog(newLog);
    } else {
      newLog.push({ type: "error", text: `bash: command not found: ${cmd}. Try 'help'.` });
      setLog(newLog);
    }
    setInput("");
  };

  return (
    <section id="about" className="relative w-full py-24 px-6 md:px-24 bg-[#0a0a0a] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        {/* Left column: profile text */}
        <div className="md:w-1/3">
          <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4">
            Profile Summary
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
            I am a <span className="font-bold text-white">System &amp; Network Administrator</span> specializing in robust IT infrastructure and secure enterprise networking.
          </h2>
        </div>

        {/* Right column: bio + terminal */}
        <div className="md:w-2/3 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-neutral-400 font-light text-lg md:text-xl leading-relaxed space-y-6"
          >
            <p>
              I specialize in architecting, managing, and optimizing enterprise IT environments to guarantee maximum uptime, seamless connectivity, and robust network security. My technical depth spans complex firewall administration (Sophos XG), advanced endpoint protection, and proactive infrastructure monitoring.
            </p>
            <p>
              With extensive hands-on experience managing critical network hardware and software deployments across large-scale hospitality and corporate sectors, I excel at transforming complex IT challenges into highly efficient, deeply secure operational foundations.
            </p>
          </motion.div>

          {/* CLI Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`border rounded-2xl overflow-hidden shadow-2xl transition-colors duration-500 ${
              isHackerTheme 
                ? "bg-[#020d04] border-green-500/30 shadow-green-500/5" 
                : "bg-[#050505] border-white/[0.07]"
            }`}
            onClick={(e) => {
              // Avoid focusing if clicking inside the scroll log container and selecting text
              const selection = window.getSelection();
              if (selection && selection.toString().length > 0) return;
              
              // Focus the input, but prevent the page from jumping
              inputRef.current?.focus({ preventScroll: true });
            }}
          >
            {/* Terminal title bar */}
            <div className={`flex items-center justify-between px-4 py-3 border-b transition-colors duration-500 ${
              isHackerTheme 
                ? "bg-[#031406] border-green-500/10" 
                : "bg-[#0d0d0d] border-white/[0.05]"
            }`}>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className={`flex items-center gap-2 text-xs font-mono transition-colors duration-500 ${
                isHackerTheme ? "text-green-500" : "text-neutral-500"
              }`}>
                <Terminal className="w-3 h-3 animate-pulse" />
                {isHackerTheme ? "bash — root@security-core" : "bash — basharat@system-console"}
              </div>
              <div className="w-16" />
            </div>

            {/* Terminal output log */}
            <div
              ref={scrollContainerRef}
              onClick={(e) => e.stopPropagation()} // Stop click bubbling when interacting with log text
              className="p-4 h-64 overflow-y-auto font-mono text-xs leading-relaxed scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 cursor-text"
            >
              {log.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap break-all ${
                    line.type === "input"
                      ? isHackerTheme ? "text-green-300" : "text-blue-400"
                      : line.type === "error"
                      ? "text-red-400 font-semibold"
                      : isHackerTheme
                      ? "text-green-400"
                      : "text-neutral-400"
                  }`}
                >
                  {line.text}
                </div>
              ))}
            </div>

            {/* Terminal input row */}
            <form
              onSubmit={handleCommand}
              className={`flex items-center gap-2 border-t px-4 py-3 transition-colors duration-500 ${
                isHackerTheme 
                  ? "bg-[#031406] border-green-500/10" 
                  : "bg-[#0d0d0d] border-white/[0.05]"
              }`}
            >
              <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${
                isHackerTheme ? "text-green-400" : "text-green-400"
              }`} />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onClick={(e) => e.stopPropagation()} // Prevent click bubbling to container
                placeholder={challengeStage > 0 ? "type instruction (e.g. cat logs)..." : "type a command..."}
                className={`flex-1 bg-transparent text-xs font-mono outline-none placeholder-neutral-600 caret-green-400 transition-colors duration-500 ${
                  isHackerTheme ? "text-green-400" : "text-white"
                }`}
                autoComplete="off"
                spellCheck={false}
              />
              <span className="text-[10px] text-neutral-600 font-mono hidden sm:block">↵ Enter</span>
            </form>
          </motion.div>
        </div>
      </div>
      
      <SshGateway isOpen={isSshOpen} onClose={() => setIsSshOpen(false)} />
    </section>
  );
}
