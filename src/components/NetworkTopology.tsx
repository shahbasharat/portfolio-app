"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Shield, Server, Network, ShieldCheck, 
  Activity, Radio, Key, HardDrive, ShieldAlert,
  Play, RotateCcw, AlertTriangle, ArrowRight, ToggleLeft, ToggleRight
} from "lucide-react";

type NodeId = "wan" | "firewall" | "switch" | "server" | "endpoints";

interface NodeDetail {
  title: string;
  subtitle: string;
  status: "secure" | "active" | "online";
  description: string;
  icon: React.ReactNode;
  color: string;
  stats: { label: string; value: string; icon?: React.ReactNode }[];
  logs: string[];
}

export default function NetworkTopology() {
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);
  
  // Traceroute States
  const [traceDest, setTraceDest] = useState<"google" | "ad" | "malicious">("google");
  const [traceProgress, setTraceProgress] = useState<number>(-1); // -1 = idle
  const [traceLogs, setTraceLogs] = useState<string[]>([]);
  const [isTracing, setIsTracing] = useState(false);
  const [firewallAlarm, setFirewallAlarm] = useState(false);

  // GPO Configurator States
  const [gpos, setGpos] = useState({
    passwordComplexity: true,
    usbBlocking: false,
    powershellRestriction: false,
    edrEnforcement: true,
  });

  const getComplianceScore = () => {
    let score = 50; // Base score
    if (gpos.passwordComplexity) score += 15;
    if (gpos.usbBlocking) score += 15;
    if (gpos.powershellRestriction) score += 10;
    if (gpos.edrEnforcement) score += 10;
    return score;
  };

  const handleGpoToggle = (key: keyof typeof gpos) => {
    setGpos((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Run Traceroute simulation
  const startTraceroute = () => {
    if (isTracing) return;
    setIsTracing(true);
    setTraceProgress(0);
    setFirewallAlarm(false);
    
    let destIP = "";
    let destName = "";
    if (traceDest === "google") {
      destIP = "8.8.8.8";
      destName = "google-dns.com";
    } else if (traceDest === "ad") {
      destIP = "192.168.1.10";
      destName = "ad-host.corp.khyber.local";
    } else {
      destIP = "185.220.101.4";
      destName = "tor-exit-node.onion";
    }

    setTraceLogs([`Tracing route to ${destName} [${destIP}] over a maximum of 30 hops:`]);

    // Hop 1: WAN Gateway
    setTimeout(() => {
      setTraceProgress(1);
      setTraceLogs((prev) => [...prev, "  1     2 ms     1 ms     1 ms  wan.local [103.88.241.1]"]);
    }, 1000);

    // Hop 2: Sophos Firewall
    setTimeout(() => {
      setTraceProgress(2);
      setTraceLogs((prev) => [...prev, "  2     4 ms     3 ms     3 ms  sophos-xg135.local [192.168.1.1]"]);
      
      if (traceDest === "malicious") {
        setTimeout(() => {
          setFirewallAlarm(true);
          setTraceLogs((prev) => [
            ...prev, 
            "  *     *     *     Request timed out.",
            "⛔ [FIREWALL ALERT] Access Denied: Sophos Policy ID 42 (Malicious IP Block) blocked packet transmission."
          ]);
          setIsTracing(false);
        }, 1000);
      }
    }, 2000);

    if (traceDest === "malicious") return;

    // Hop 3: Core Switch
    setTimeout(() => {
      setTraceProgress(3);
      setTraceLogs((prev) => [...prev, "  3     5 ms     5 ms     4 ms  core-switch.local [192.168.1.5]"]);
    }, 3000);

    // Hop 4: Server Host or Endpoints (Final Destination)
    setTimeout(() => {
      setTraceProgress(4);
      if (traceDest === "ad") {
        setTraceLogs((prev) => [
          ...prev, 
          "  4     6 ms     6 ms     7 ms  ad-host.corp.khyber.local [192.168.1.10]",
          "✓ Trace complete. Target reached successfully."
        ]);
      } else {
        setTraceLogs((prev) => [
          ...prev, 
          "  4     8 ms     7 ms     7 ms  google-dns.com [8.8.8.8]",
          "✓ Trace complete. Target reached successfully."
        ]);
      }
      setIsTracing(false);
    }, 4000);
  };

  const resetTraceroute = () => {
    setTraceProgress(-1);
    setTraceLogs([]);
    setIsTracing(false);
    setFirewallAlarm(false);
  };

  const nodeDetails: Record<NodeId, NodeDetail> = {
    wan: {
      title: "WAN Gateway (Internet Link)",
      subtitle: "Enterprise Fiber Link",
      status: "online",
      description: "Primary ISP Gateway providing redundant dedicated fiber connectivity for resort operations and guest services.",
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      color: "from-blue-500/20 to-blue-500/5",
      stats: [
        { label: "WAN IP Address", value: "103.88.241.18" },
        { label: "Active Bandwidth", value: "850 Mbps / 1 Gbps" },
        { label: "Uptime (ISP Link)", value: "99.98% (SLA)", icon: <Activity className="w-3.5 h-3.5" /> },
        { label: "Packet Loss / Latency", value: "0.01% / 4ms" }
      ],
      logs: [
        "12:45:01 Gateway interface check: PASS",
        "12:30:00 Dynamic DNS updated successfully",
        "11:00:24 Failover path tested: Standard routing active"
      ]
    },
    firewall: {
      title: "Sophos XG135 Firewall",
      subtitle: "Security & VPN Gateway",
      status: "secure",
      description: "Hardened perimeter firewall managing traffic inspection, packet filtering, Site-to-Site IPSec VPNs, and user bandwidth control policies.",
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-500/20 to-emerald-500/5",
      stats: [
        { label: "Intrusion Prevention (IDS/IPS)", value: "Enabled & Active" },
        { label: "Active IPSec VPN Tunnels", value: "5 Active Tunnels", icon: <Key className="w-3.5 h-3.5" /> },
        { label: "Web/App Filter Profile", value: "Hospitality Compliance" },
        { label: "Threat Level Detected", value: "0 Clean (Clean Log)" }
      ],
      logs: [
        "12:44:12 Blocked port scan from IP 185.220.101.4",
        "12:15:30 VPN Tunnel to Corporate HQ: Handshake complete",
        "11:32:04 Automated definitions update: Successfully installed"
      ]
    },
    switch: {
      title: "Ruckus Switch & Controller",
      subtitle: "Local Network Core",
      status: "active",
      description: "Layer 3 core switch fabric routing VLANs and managing distributed Ruckus Smart Wi-Fi Access Points via central controller.",
      icon: <Network className="w-6 h-6 text-purple-400" />,
      color: "from-purple-500/20 to-purple-500/5",
      stats: [
        { label: "Active Access Points", value: "12 APs Online", icon: <Radio className="w-3.5 h-3.5" /> },
        { label: "Connected Clients (Wi-Fi)", value: "342 Active Devices" },
        { label: "VLAN Segmentation", value: "Staff (V10), Guest (V20), POS (V30)" },
        { label: "Switch Fabric Backplane", value: "128 Gbps (100% OK)" }
      ],
      logs: [
        "12:43:55 Roaming client authenticated on AP-04 (Guest VLAN)",
        "12:35:10 Core Link aggregation test: Passive backup active",
        "10:14:00 Ruckus Controller configuration backup: SUCCESS"
      ]
    },
    server: {
      title: "Windows Server / VM Host",
      subtitle: "Domain Services & Storage",
      status: "active",
      description: "Local Active Directory Domain Services (AD DS) server handling credential authentication, access management, GPOs, and backups.",
      icon: <Server className="w-6 h-6 text-amber-400" />,
      color: "from-amber-500/20 to-amber-500/5",
      stats: [
        { label: "AD DS Domain Controller", value: "Domain Controller Active" },
        { label: "Group Policies Enforced", value: "22 GPOs Enforced" },
        { label: "Daily Server Backups", value: "Completed 02:00 AM (Daily)", icon: <HardDrive className="w-3.5 h-3.5" /> },
        { label: "Veeam Replication Sync", value: "Success (100% Verified)" }
      ],
      logs: [
        "12:40:02 User admin.salam authenticated via AD DS",
        "02:30:15 Veeam Agent Backup Job 'AD-REPLICA': SUCCESS",
        "01:00:00 Weekly Group Policy consistency check: PASS"
      ]
    },
    endpoints: {
      title: "Seqrite EDR Endpoint Protection",
      subtitle: "Active Endpoint Security",
      status: "secure",
      description: "Monitored workstations and administrative endpoints guarded by Seqrite EDR agents checking compliance and triaging host threat events.",
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      color: "from-cyan-500/20 to-cyan-500/5",
      stats: [
        { label: "Total Managed Endpoints", value: "152 Managed Hosts" },
        { label: "EDR Agent Compliance", value: "100% Compliant Agents" },
        { label: "Threat Definition Version", value: "Latest (Auto-update 1h ago)" },
        { label: "Host Security Events", value: "0 Active Threats", icon: <ShieldCheck className="w-3.5 h-3.5" /> }
      ],
      logs: [
        "12:41:00 Endpoint WS-102: Full System scan completed - 0 threats",
        "11:12:44 Web security policy blocked unauthorized download on WS-08",
        "09:30:00 Registry integrity guard check: Compliant"
      ]
    }
  };

  return (
    <section id="network-lab" className="relative w-full py-24 px-6 md:px-24 bg-black border-t border-white/[0.05]">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500 animate-pulse" /> Infrastructure Simulation
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light">
            Interactive <span className="font-bold text-white">Network Lab.</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-3xl mt-4 font-light">
            Click on any network element below to inspect active simulated logs, live telemetry, and configurations representing my system administration environments.
          </p>
        </div>

        {/* Visual Lab Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          
          {/* SVG Topology (Left/Center columns) */}
          <div className="lg:col-span-2 bg-[#050505] border border-white/[0.05] rounded-3xl p-6 md:p-10 flex flex-col justify-between min-h-[480px] shadow-2xl relative overflow-hidden">
            {/* Visual Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 text-xs text-neutral-500 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 
                SIMULATION: RUNNING
              </span>
              <span>NETWORK STATUS: {firewallAlarm ? "⚠️ ATTACK BLOCKED" : "SECURED"}</span>
            </div>

            {/* Interactive SVG Diagram */}
            <div className="flex-1 flex items-center justify-center p-2">
              <svg 
                viewBox="0 0 800 450" 
                className="w-full h-auto max-h-[360px] select-none"
                style={{ overflow: "visible" }}
              >
                {/* Connection Lines (Paths) */}
                
                {/* WAN to Firewall */}
                <path d="M 120 225 L 280 225" stroke="#171717" strokeWidth="3" />
                <path 
                  d="M 120 225 L 280 225" 
                  stroke={traceProgress >= 1 ? (traceDest === "malicious" && traceProgress === 2 ? "#ef4444" : "#3b82f6") : "#3b82f6"} 
                  strokeWidth="2" 
                  strokeDasharray="8 12" 
                  className={`animate-[dash_10s_linear_infinite] transition-colors duration-300 ${traceProgress >= 1 ? "opacity-100" : "opacity-30"}`}
                  style={{ strokeDashoffset: 100 }}
                />

                {/* Firewall to Switch */}
                <path d="M 320 225 L 480 225" stroke="#171717" strokeWidth="3" />
                <path 
                  d="M 320 225 L 480 225" 
                  stroke={traceProgress >= 2 ? (traceDest === "malicious" ? "#ef4444" : "#10b981") : "#10b981"} 
                  strokeWidth="2" 
                  strokeDasharray="8 12" 
                  className={`animate-[dash_10s_linear_infinite] transition-colors duration-300 ${traceProgress >= 2 && traceDest !== "malicious" ? "opacity-100" : "opacity-30"}`}
                  style={{ strokeDashoffset: 100 }}
                />

                {/* Switch to Server */}
                <path d="M 520 205 L 680 120" stroke="#171717" strokeWidth="3" />
                <path 
                  d="M 520 205 L 680 120" 
                  stroke="#a855f7" 
                  strokeWidth="2" 
                  strokeDasharray="8 12" 
                  className={`animate-[dash_15s_linear_infinite] ${traceProgress >= 3 && traceDest === "ad" ? "opacity-100" : "opacity-30"}`}
                  style={{ strokeDashoffset: 100 }}
                />

                {/* Switch to Endpoints */}
                <path d="M 520 245 L 680 330" stroke="#171717" strokeWidth="3" />
                <path 
                  d="M 520 245 L 680 330" 
                  stroke="#a855f7" 
                  strokeWidth="2" 
                  strokeDasharray="8 12" 
                  className="animate-[dash_15s_linear_infinite] opacity-30"
                  style={{ strokeDashoffset: 100 }}
                />

                {/* Nodes */}
                
                {/* WAN Node */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setActiveNode("wan")}
                >
                  <circle cx="120" cy="225" r="36" fill="#080808" stroke={activeNode === "wan" ? "#3b82f6" : "#262626"} strokeWidth="2" className="transition-all duration-300 group-hover:stroke-blue-400 group-hover:fill-blue-950/20" />
                  <g className="transition-transform duration-300 group-hover:scale-110" style={{ transformOrigin: "120px 225px" }}>
                    <circle cx="120" cy="225" r="28" fill="#3b82f6" fillOpacity="0.1" />
                    <foreignObject x="108" y="213" width="24" height="24">
                      <Globe className={`w-6 h-6 transition-colors ${traceProgress === 1 ? "text-blue-400" : "text-blue-500"}`} />
                    </foreignObject>
                  </g>
                  <text x="120" y="280" textAnchor="middle" fill="#737373" className="text-xs font-mono group-hover:fill-white transition-colors duration-300">WAN GATEWAY</text>
                </g>

                {/* Firewall Node */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setActiveNode("firewall")}
                >
                  <circle cx="300" cy="225" r="40" fill="#080808" stroke={firewallAlarm ? "#ef4444" : activeNode === "firewall" ? "#10b981" : "#262626"} strokeWidth="2" className={`transition-all duration-300 group-hover:stroke-emerald-400 group-hover:fill-emerald-950/20 ${firewallAlarm ? "animate-pulse fill-red-950/20" : ""}`} />
                  <g className="transition-transform duration-300 group-hover:scale-110" style={{ transformOrigin: "300px 225px" }}>
                    <circle cx="300" cy="225" r="32" fill={firewallAlarm ? "#ef4444" : "#10b981"} fillOpacity="0.1" />
                    <foreignObject x="288" y="213" width="24" height="24">
                      {firewallAlarm ? (
                        <ShieldAlert className="w-6 h-6 text-red-500" />
                      ) : (
                        <Shield className="w-6 h-6 text-emerald-500" />
                      )}
                    </foreignObject>
                  </g>
                  <text x="300" y="285" textAnchor="middle" fill="#737373" className="text-xs font-mono group-hover:fill-white transition-colors duration-300">SOPHOS FIREWALL</text>
                </g>

                {/* Switch Node */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setActiveNode("switch")}
                >
                  <circle cx="500" cy="225" r="40" fill="#080808" stroke={activeNode === "switch" ? "#a855f7" : "#262626"} strokeWidth="2" className="transition-all duration-300 group-hover:stroke-purple-400 group-hover:fill-purple-950/20" />
                  <g className="transition-transform duration-300 group-hover:scale-110" style={{ transformOrigin: "500px 225px" }}>
                    <circle cx="500" cy="225" r="32" fill="#a855f7" fillOpacity="0.1" />
                    <foreignObject x="488" y="213" width="24" height="24">
                      <Network className="w-6 h-6 text-purple-500" />
                    </foreignObject>
                  </g>
                  <text x="500" y="285" textAnchor="middle" fill="#737373" className="text-xs font-mono group-hover:fill-white transition-colors duration-300">RUCKUS CORE</text>
                </g>

                {/* AD Server Node */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setActiveNode("server")}
                >
                  <circle cx="680" cy="120" r="36" fill="#080808" stroke={activeNode === "server" ? "#f59e0b" : "#262626"} strokeWidth="2" className="transition-all duration-300 group-hover:stroke-amber-400 group-hover:fill-amber-950/20" />
                  <g className="transition-transform duration-300 group-hover:scale-110" style={{ transformOrigin: "680px 120px" }}>
                    <circle cx="680" cy="120" r="28" fill="#f59e0b" fillOpacity="0.1" />
                    <foreignObject x="668" y="108" width="24" height="24">
                      <Server className="w-6 h-6 text-amber-500" />
                    </foreignObject>
                  </g>
                  <text x="680" y="175" textAnchor="middle" fill="#737373" className="text-xs font-mono group-hover:fill-white transition-colors duration-300">SERVER HOST</text>
                </g>

                {/* EDR/Endpoints Node */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setActiveNode("endpoints")}
                >
                  <circle cx="680" cy="330" r="36" fill="#080808" stroke={activeNode === "endpoints" ? "#06b6d4" : "#262626"} strokeWidth="2" className="transition-all duration-300 group-hover:stroke-cyan-400 group-hover:fill-cyan-950/20" />
                  <g className="transition-transform duration-300 group-hover:scale-110" style={{ transformOrigin: "680px 330px" }}>
                    <circle cx="680" cy="330" r="28" fill="#06b6d4" fillOpacity="0.1" />
                    <foreignObject x="668" y="318" width="24" height="24">
                      <ShieldCheck className="w-6 h-6 text-cyan-500" />
                    </foreignObject>
                  </g>
                  <text x="680" y="385" textAnchor="middle" fill="#737373" className="text-xs font-mono group-hover:fill-white transition-colors duration-300">SEQRITE EDR</text>
                </g>
              </svg>
            </div>

            {/* Hint for visitors */}
            <div className="text-center text-xs text-neutral-500 italic mt-4 font-mono select-none">
              ℹ️ Click on a component symbol in the diagram to load network telemetry.
            </div>
          </div>

          {/* Details Sidebar Panel */}
          <div className="bg-[#050505] border border-white/[0.05] rounded-3xl p-6 md:p-8 flex flex-col min-h-[480px] shadow-2xl relative">
            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    {/* Node Header */}
                    <div className="flex items-center gap-4 border-b border-white/5 pb-4 mb-4">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                        {nodeDetails[activeNode].icon}
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-white leading-tight">
                          {nodeDetails[activeNode].title}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1 font-mono">
                          {nodeDetails[activeNode].subtitle}
                        </p>
                      </div>
                    </div>

                    {/* INTERACTIVE COMPONENT: WAN TRACEROUTE SIMULATION */}
                    {activeNode === "wan" && (
                      <div className="border border-white/5 bg-black/45 rounded-2xl p-4 space-y-4">
                        <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-blue-400" /> Traceroute tool
                        </h5>
                        
                        <div className="space-y-2">
                          <label className="text-[10px] text-neutral-500 font-mono block">SELECT DESTINATION:</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[
                              { id: "google", name: "Google DNS" },
                              { id: "ad", name: "AD Host" },
                              { id: "malicious", name: "TOR Node" }
                            ].map((opt) => (
                              <button
                                key={opt.id}
                                disabled={isTracing}
                                onClick={() => setTraceDest(opt.id as any)}
                                className={`py-1.5 px-1 text-[10px] font-mono border rounded-lg transition-all ${
                                  traceDest === opt.id
                                    ? opt.id === "malicious"
                                      ? "border-red-500/40 bg-red-950/20 text-red-400"
                                      : "border-blue-500/40 bg-blue-950/20 text-blue-400"
                                    : "border-white/[0.05] bg-[#0c0c0c] text-neutral-500 hover:text-white"
                                }`}
                              >
                                {opt.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={startTraceroute}
                            disabled={isTracing}
                            className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 rounded-xl text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Play className="w-3.5 h-3.5" /> Start Trace
                          </button>
                          <button
                            onClick={resetTraceroute}
                            className="py-2 px-3 bg-neutral-900 border border-white/10 hover:border-white/20 text-neutral-300 rounded-xl font-mono text-xs flex items-center justify-center gap-1.5 transition-all"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Reset
                          </button>
                        </div>

                        {/* Terminal output box */}
                        <div className="bg-black border border-white/5 rounded-xl p-3 h-32 overflow-y-auto font-mono text-[9px] text-neutral-400 space-y-1 leading-relaxed scrollbar-thin">
                          {traceLogs.length === 0 ? (
                            <span className="text-neutral-600">Traceroute results will stream here...</span>
                          ) : (
                            traceLogs.map((log, idx) => (
                              <div key={idx} className="whitespace-pre-wrap">{log}</div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* INTERACTIVE COMPONENT: AD DS GROUP POLICY MANAGER */}
                    {activeNode === "server" && (
                      <div className="border border-white/5 bg-black/45 rounded-2xl p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                            AD DS GPO MANAGER
                          </h5>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            getComplianceScore() >= 85 
                              ? "bg-emerald-950/30 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-950/30 text-amber-400 border border-amber-500/20"
                          }`}>
                            SCORE: {getComplianceScore()}%
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {[
                            { key: "passwordComplexity", label: "Password Complexity GPO (+15%)" },
                            { key: "usbBlocking", label: "Disable Host USB Ports GPO (+15%)" },
                            { key: "powershellRestriction", label: "PowerShell Exec Restriction (+10%)" },
                            { key: "edrEnforcement", label: "Auto-Deploy Seqrite EDR (+10%)" }
                          ].map((gpo) => (
                            <div 
                              key={gpo.key}
                              onClick={() => handleGpoToggle(gpo.key as any)}
                              className="flex justify-between items-center p-2 border border-white/[0.03] bg-[#0c0c0c] hover:bg-[#121212] rounded-xl cursor-pointer select-none transition-colors"
                            >
                              <span className="text-[10px] text-neutral-400 font-mono">{gpo.label}</span>
                              <button className="text-neutral-500 hover:text-white transition-colors">
                                {gpos[gpo.key as keyof typeof gpos] ? (
                                  <ToggleRight className="w-6 h-6 text-emerald-500" />
                                ) : (
                                  <ToggleLeft className="w-6 h-6 text-neutral-700" />
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Standard details description (if not showing full details on specific nodes to save space) */}
                    {activeNode !== "wan" && activeNode !== "server" && (
                      <p className="text-sm text-neutral-400 font-light leading-relaxed">
                        {nodeDetails[activeNode].description}
                      </p>
                    )}

                    {/* Stats List */}
                    <div>
                      <h5 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2.5">Live Telemetry</h5>
                      <div className="grid grid-cols-1 gap-2">
                        {nodeDetails[activeNode].stats.map((stat, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white/[0.02] border border-white/[0.03] px-3.5 py-2 rounded-xl text-xs">
                            <span className="text-neutral-500 font-light">{stat.label}</span>
                            <span className="text-white font-mono flex items-center gap-1.5">
                              {stat.icon}
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Security Logs */}
                    <div>
                      <h5 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2.5">Host Security Logs</h5>
                      <div className="bg-black/60 border border-white/5 rounded-xl p-3.5 font-mono text-[10px] text-neutral-400 space-y-1.5 leading-relaxed">
                        {nodeDetails[activeNode].logs.map((log, idx) => (
                          <div key={idx} className="flex gap-2">
                            <span className="text-neutral-600 select-none">[{idx}]</span>
                            <span className="break-all">{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveNode(null)}
                    className="mt-6 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-mono rounded-xl text-neutral-300 hover:text-white transition-all text-center"
                  >
                    Clear Telemetry View
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-4"
                >
                  <div className="w-16 h-16 bg-white/[0.02] border border-dashed border-white/10 rounded-full flex items-center justify-center mb-6 text-neutral-500 animate-pulse">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-light text-white mb-2">Select a Device</h4>
                  <p className="text-sm text-neutral-500 max-w-xs font-light leading-relaxed">
                    Click any node inside the network topology visualization to analyze live logs, system settings, and interface telemetry.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
      
      {/* Embedded CSS for animated stroke-dash offsets in SVGs */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
