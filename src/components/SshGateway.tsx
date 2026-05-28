"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, ChevronRight } from "lucide-react";

interface SshGatewayProps {
  isOpen: boolean;
  onClose: () => void;
}

type CommandLog = { type: "input" | "output" | "error"; text: string };

const FILESYSTEM: Record<string, any> = {
  "experience": {
    "kyber_resort.txt": "ROLE: System Administrator (Aug 2023 - Present)\n- Hardened network perimeter via Sophos XG135 firewall rules.\n- Managed Active Directory (AD DS) and Group Policies (GPOs) for 150+ users.\n- Managed Ruckus Wi-Fi Smart Controller and Access Points.",
    "skyview_empyrean.txt": "ROLE: IT Support Engineer (Jan 2023 - Aug 2023)\n- Administered server backplanes, network switches, and patch panels.\n- Handled hardware deployments, structured cabling, and daily operations.\n- Monitored network traffic logs to detect anomalies.",
    "ison_xperience.txt": "ROLE: IT Support Associate (Feb 2022 - Dec 2022)\n- Handled desktop troubleshooting, Avaya CRM, and backups.\n- Maintained LAN network devices, DNS/DHCP servers."
  },
  "skills": {
    "security.txt": "SECURITY & FIREWALLS:\n- Sophos XG Firewall Policies, VPN (IPSec/SSL), IDS/IPS\n- Seqrite Endpoint Detection & Response (EDR)\n- Host security audits and log analysis",
    "networking.txt": "ROUTING & SWITCHING:\n- CCNA, TCP/IP, OSI model segmentations\n- VLAN configurations and subnet routing\n- Ruckus Access Points & Wi-Fi controllers",
    "systems.txt": "SYSTEMS ADMINISTRATION:\n- Windows Server 2016/2019/2022, Active Directory (AD DS)\n- DHCP, DNS, GPO administration, Veeam Replication"
  },
  "certifications": {
    "google_cyber.txt": "Google Cybersecurity Certificate (2026) - Threat analysis, SIEM, and IDS/IPS.",
    "deloitte_cyber.txt": "Deloitte Cyber Security Simulation (2025) - Logs analysis, incident response.",
    "cisco_ccna.txt": "Cisco Certified Network Associate (CCNA) (2024) - Network security and device hardening."
  },
  "about.txt": "Basharat Salam — System & Network Administrator.\nSpecializing in secure IT infrastructures, firewalls, and Windows Active Directory services.\nEmail: shahbasharat577@gmail.com\nLocation: Srinagar, India"
};

export default function SshGateway({ isOpen, onClose }: SshGatewayProps) {
  const [input, setInput] = useState("");
  const [currentDir, setCurrentDir] = useState<string>("/");
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal
  useEffect(() => {
    if (isOpen) {
      setLogs([
        { type: "output", text: "Connecting to remote gateway basharatsalam.vercel.app..." },
        { type: "output", text: "Connection established. TLS 1.3 Handshake completed." },
        { type: "output", text: "Welcome to SSH Gateway v3.5 (authenticated as guest)" },
        { type: "output", text: "Type 'help' to see list of remote command scripts. Use 'exit' to disconnect." },
        { type: "output", text: "─────────────────────────────────────────────────────────────────" }
      ]);
      // Focus input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom on log change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    const newLogs: CommandLog[] = [
      ...logs,
      { type: "input", text: `guest@basharatsalam.com:${currentDir}$ ${raw}` }
    ];

    const tokens = raw.toLowerCase().split(/\s+/);
    const mainCmd = tokens[0];
    const arg = tokens[1];

    if (mainCmd === "exit") {
      onClose();
      setInput("");
      return;
    }

    if (mainCmd === "clear") {
      setLogs([]);
      setInput("");
      return;
    }

    if (mainCmd === "help") {
      const helpText = [
        "Available SSH Commands:",
        "  ls [dir]        - List directory contents (e.g. ls experience)",
        "  cat <file>      - Output file contents (e.g. cat about.txt)",
        "  cd <dir>        - Change directory path (e.g. cd skills)",
        "  nmap localhost  - Perform diagnostic port scan on remote host",
        "  whoami          - Query active remote user session details",
        "  clear           - Clear terminal buffer",
        "  exit            - Disconnect remote SSH session"
      ];
      helpText.forEach((l) => newLogs.push({ type: "output", text: l }));
    } else if (mainCmd === "whoami") {
      newLogs.push({ type: "output", text: "guest@basharatsalam.com (Remote auditor profile)" });
    } else if (mainCmd === "nmap") {
      if (arg === "localhost" || arg === "127.0.0.1") {
        const nmapOutput = [
          "Starting Nmap 7.92 ( https://nmap.org ) at 2026-05-28",
          "Nmap scan report for localhost (127.0.0.1)",
          "Host is up (0.00012s latency).",
          "Not shown: 996 closed tcp ports",
          "PORT     STATE SERVICE",
          "22/tcp   open  ssh",
          "80/tcp   open  http",
          "433/tcp  open  https",
          "3389/tcp open  ms-wbt-server (Remote Desktop)",
          "",
          "Nmap done: 1 IP address scanned (1 host up) scanned in 0.85 seconds"
        ];
        nmapOutput.forEach((l) => newLogs.push({ type: "output", text: l }));
      } else {
        newLogs.push({ type: "error", text: "nmap: invalid target. Only 'localhost' is permitted for diagnostic testing." });
      }
    } else if (mainCmd === "cd") {
      if (!arg || arg === "/" || arg === "~") {
        setCurrentDir("/");
        newLogs.push({ type: "output", text: "Moved to root /" });
      } else if (arg === "..") {
        if (currentDir !== "/") {
          setCurrentDir("/");
          newLogs.push({ type: "output", text: "Moved to root /" });
        } else {
          newLogs.push({ type: "output", text: "Already in root /" });
        }
      } else {
        const cleanArg = arg.replace(/^\//, "").replace(/\/$/, "");
        if (FILESYSTEM[cleanArg] && typeof FILESYSTEM[cleanArg] === "object") {
          setCurrentDir(`/${cleanArg}`);
          newLogs.push({ type: "output", text: `Moved to /${cleanArg}` });
        } else {
          newLogs.push({ type: "error", text: `cd: no such directory: ${arg}` });
        }
      }
    } else if (mainCmd === "ls") {
      // If we are listing a subdirectory
      let targetDir = currentDir;
      let checkArg = arg;
      if (checkArg) {
        checkArg = checkArg.replace(/^\//, "").replace(/\/$/, "");
      }

      if (checkArg) {
        if (FILESYSTEM[checkArg]) {
          const contents = Object.keys(FILESYSTEM[checkArg]);
          newLogs.push({ type: "output", text: contents.join("    ") });
        } else {
          newLogs.push({ type: "error", text: `ls: cannot access '${arg}': No such directory` });
        }
      } else if (currentDir === "/") {
        // List root
        const rootItems = [...Object.keys(FILESYSTEM).filter(k => typeof FILESYSTEM[k] === "object").map(k => `${k}/`), "about.txt"];
        newLogs.push({ type: "output", text: rootItems.join("    ") });
      } else {
        // List current subdirectory
        const cleanDir = currentDir.replace(/^\//, "");
        const contents = Object.keys(FILESYSTEM[cleanDir]);
        newLogs.push({ type: "output", text: contents.join("    ") });
      }
    } else if (mainCmd === "cat") {
      if (!arg) {
        newLogs.push({ type: "error", text: "cat: missing file parameter." });
      } else {
        // Find file
        let pathTokens = arg.split("/");
        let filename = pathTokens[pathTokens.length - 1];
        let foldername = pathTokens.length > 1 ? pathTokens[0] : currentDir.replace(/^\//, "");

        if (foldername === "" || foldername === "/") {
          // File is in root
          if (FILESYSTEM[filename] && typeof FILESYSTEM[filename] === "string") {
            newLogs.push({ type: "output", text: FILESYSTEM[filename] });
          } else {
            newLogs.push({ type: "error", text: `cat: ${arg}: No such file or folder` });
          }
        } else {
          // File is in subdirectory
          if (FILESYSTEM[foldername] && FILESYSTEM[foldername][filename]) {
            newLogs.push({ type: "output", text: FILESYSTEM[foldername][filename] });
          } else {
            newLogs.push({ type: "error", text: `cat: ${arg}: No such file in directory` });
          }
        }
      }
    } else {
      newLogs.push({ type: "error", text: `bash: command not found: ${mainCmd}. Type 'help' for instructions.` });
    }

    setLogs(newLogs);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[2000] bg-black/95 flex flex-col items-center justify-center p-4 md:p-10"
        >
          {/* Main Console Box */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-full max-w-5xl h-[85vh] bg-[#020302] border border-green-500/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#050705] border-b border-green-500/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-green-400/80">
                <Terminal className="w-3.5 h-3.5 animate-pulse" />
                <span>guest@basharatsalam.com: SSH Gateway</span>
              </div>
              <button 
                onClick={onClose}
                className="text-green-500/60 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-all"
                aria-label="Close terminal gateway"
              >
                <X size={18} />
              </button>
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto font-mono text-xs md:text-sm text-green-400 space-y-2 select-text scrollbar-thin scrollbar-track-transparent scrollbar-thumb-green-500/10"
            >
              {logs.map((l, idx) => (
                <div 
                  key={idx} 
                  className={`whitespace-pre-wrap leading-relaxed ${
                    l.type === "input" 
                      ? "text-green-300 font-bold" 
                      : l.type === "error" 
                      ? "text-red-400 font-semibold" 
                      : "text-green-400/90"
                  }`}
                >
                  {l.text}
                </div>
              ))}
            </div>

            {/* Input Row */}
            <form
              onSubmit={handleCommandSubmit}
              className="flex items-center gap-2 border-t border-green-500/10 px-6 py-4 bg-[#050705]"
            >
              <span className="text-green-300 font-bold font-mono text-xs md:text-sm">
                guest@basharatsalam.com:{currentDir}$
              </span>
              <ChevronRight className="w-4 h-4 text-green-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="type command (e.g. ls, help)..."
                className="flex-1 bg-transparent text-green-400 font-mono text-xs md:text-sm outline-none placeholder-green-950/60 caret-green-400"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="text-[10px] text-green-700 font-mono hidden sm:block">↵ Enter</span>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
