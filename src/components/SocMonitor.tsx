"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, ShieldCheck, Activity, Terminal, 
  RefreshCw, Power, AlertTriangle, AlertCircle
} from "lucide-react";

interface Alert {
  id: string;
  timestamp: string;
  source: string;
  type: "critical" | "warning" | "info";
  message: string;
  status: "active" | "mitigating" | "resolved";
}

const TEMPLATE_ALERTS = [
  { source: "SOPHOS-XG", type: "critical", message: "SSH Brute-force attack blocked from IP 198.51.100.72" },
  { source: "SEQRITE-EDR", type: "warning", message: "Suspicious DLL injection prevented on WS-108" },
  { source: "AD-DS", type: "warning", message: "Multiple failed AD login attempts for user 'backup_admin'" },
  { source: "WAN-GW", type: "info", message: "High bandwidth utilization alert: WAN link exceeding 850 Mbps" },
  { source: "SOPHOS-IPS", type: "critical", message: "SQL Injection attack signature detected and dropped" },
  { source: "SEQRITE-EDR", type: "info", message: "Daily compliance check complete: All 152 hosts compliant" },
  { source: "RUCKUS-WIFI", type: "warning", message: "Rogue Access Point detected broadcasting SSID 'Khyber_Staff_Temp'" },
  { source: "AD-DS", type: "critical", message: "Unauthorized Domain Admin group membership change attempted" },
];

export default function SocMonitor() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [systemHealth, setSystemHealth] = useState(96);
  const [activeThreats, setActiveThreats] = useState(0);
  const [mitigatedCount, setMitigatedCount] = useState(1480);
  const [bandwidthLoad, setBandwidthLoad] = useState(65);

  // Initialize with a few alerts
  useEffect(() => {
    const initialAlerts: Alert[] = [
      {
        id: "1",
        timestamp: getFormattedTime(new Date(Date.now() - 45000)),
        source: "SOPHOS-XG",
        type: "critical",
        message: "SSH Brute-force attack blocked from IP 198.51.100.72",
        status: "active"
      },
      {
        id: "2",
        timestamp: getFormattedTime(new Date(Date.now() - 20000)),
        source: "SEQRITE-EDR",
        type: "warning",
        message: "Suspicious DLL injection prevented on WS-108",
        status: "active"
      },
      {
        id: "3",
        timestamp: getFormattedTime(new Date(Date.now() - 5000)),
        source: "WAN-GW",
        type: "info",
        message: "Dynamic DNS updated successfully to basharatsalam.vercel.app",
        status: "resolved"
      }
    ];
    setAlerts(initialAlerts);
    setActiveThreats(2);
  }, []);

  // Alert streaming cycle
  useEffect(() => {
    const interval = setInterval(() => {
      const template = TEMPLATE_ALERTS[Math.floor(Math.random() * TEMPLATE_ALERTS.length)];
      const newAlert: Alert = {
        id: Math.random().toString(),
        timestamp: getFormattedTime(new Date()),
        source: template.source,
        type: template.type as "critical" | "warning" | "info",
        message: template.message,
        status: "active"
      };

      setAlerts((prev) => [newAlert, ...prev].slice(0, 8)); // Cap log at 8 items
      
      if (newAlert.type === "critical") {
        setSystemHealth((h) => Math.max(h - 5, 60));
        setActiveThreats((t) => t + 1);
      } else if (newAlert.type === "warning") {
        setSystemHealth((h) => Math.max(h - 2, 70));
        setActiveThreats((t) => t + 1);
      }

      // Randomize bandwidth slightly
      setBandwidthLoad(Math.floor(55 + Math.random() * 35));
    }, 9000); // Add an alert every 9 seconds

    return () => clearInterval(interval);
  }, []);

  function getFormattedTime(date: Date) {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  const handleMitigate = (id: string, type: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "mitigating" } : a))
    );

    setTimeout(() => {
      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "resolved" } : a))
      );
      setActiveThreats((t) => Math.max(t - 1, 0));
      setMitigatedCount((c) => c + 1);
      setSystemHealth((h) => Math.min(h + (type === "critical" ? 5 : 2), 100));
    }, 1500);
  };

  return (
    <section id="soc-monitor" className="relative w-full py-24 px-6 md:px-24 bg-[#050505] border-t border-white/[0.05]">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" /> Live SOC Operations
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light">
            Active Security <span className="font-bold text-white">Threat Monitor.</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-3xl mt-4 font-light">
            Real-time simulated incident streaming. Act as a SOC Analyst to audit alerts, review EDR/Firewall warnings, and mitigate active network threats.
          </p>
        </div>

        {/* SOC Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Logs Stream (Left/Center columns) */}
          <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 text-xs text-neutral-500 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> 
                SOC AGENT FEED
              </span>
              <span>LIVE ALERTS: {activeThreats}</span>
            </div>

            {/* List of active/historical alerts */}
            <div className="space-y-3 min-h-[360px]">
              <AnimatePresence initial={false}>
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`border rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300 ${
                      alert.status === "resolved"
                        ? "bg-black/40 border-white/[0.03] opacity-60"
                        : alert.type === "critical"
                        ? "bg-red-950/10 border-red-500/20"
                        : alert.type === "warning"
                        ? "bg-amber-950/10 border-amber-500/20"
                        : "bg-blue-950/10 border-blue-500/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="mt-1">
                        {alert.status === "resolved" ? (
                          <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        ) : alert.type === "critical" ? (
                          <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
                        ) : alert.type === "warning" ? (
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                        ) : (
                          <Activity className="w-5 h-5 text-blue-400" />
                        )}
                      </div>

                      {/* Text details */}
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-neutral-400">
                            {alert.timestamp}
                          </span>
                          <span className={`text-[10px] font-mono font-bold tracking-wider ${
                            alert.status === "resolved"
                              ? "text-emerald-400"
                              : alert.type === "critical"
                              ? "text-red-400"
                              : alert.type === "warning"
                              ? "text-amber-400"
                              : "text-blue-400"
                          }`}>
                            [{alert.source}]
                          </span>
                        </div>
                        <p className="text-sm font-light text-white mt-1.5 leading-relaxed">
                          {alert.message}
                        </p>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="shrink-0 self-end sm:self-center">
                      {alert.status === "active" && (
                        <button
                          onClick={() => handleMitigate(alert.id, alert.type)}
                          className="px-4 py-2 text-xs font-mono border border-neutral-700 hover:border-white text-neutral-300 hover:text-white rounded-full bg-neutral-900/50 hover:bg-neutral-900 transition-all duration-300 flex items-center gap-1.5"
                        >
                          <Terminal className="w-3.5 h-3.5" /> Remediation
                        </button>
                      )}
                      {alert.status === "mitigating" && (
                        <div className="px-4 py-2 text-xs font-mono border border-amber-500/20 text-amber-400 rounded-full bg-amber-950/20 flex items-center gap-1.5">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Mitigating...
                        </div>
                      )}
                      {alert.status === "resolved" && (
                        <div className="px-4 py-2 text-xs font-mono border border-emerald-500/10 text-emerald-400 rounded-full bg-emerald-950/5 flex items-center gap-1.5 select-none">
                          <ShieldCheck className="w-3.5 h-3.5" /> Threat Blocked
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="text-center text-[10px] text-neutral-500 italic mt-6 font-mono select-none">
              ℹ️ Click the "Remediation" button on active incidents to deploy remote network security rules.
            </div>
          </div>

          {/* Sidebar Metrics (Right column) */}
          <div className="space-y-6">
            
            {/* System Security Index Gauge */}
            <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4">
                  SYSTEM SECURITY INDEX
                </h4>
                
                {/* Arc gauge */}
                <div className="relative flex items-center justify-center py-4">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Base Track */}
                      <circle cx="50" cy="50" r="40" stroke="#171717" strokeWidth="6" fill="transparent" />
                      {/* Value Line */}
                      <motion.circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        stroke={systemHealth > 85 ? "#10b981" : systemHealth > 70 ? "#f59e0b" : "#ef4444"} 
                        strokeWidth="6" 
                        fill="transparent" 
                        strokeDasharray={251.2}
                        animate={{ strokeDashoffset: 251.2 - (251.2 * systemHealth) / 100 }}
                        transition={{ duration: 1 }}
                      />
                    </svg>
                    
                    {/* Content inside arc */}
                    <div className="absolute text-center">
                      <span className="text-4xl font-black font-mono tracking-tight text-white">
                        {systemHealth}%
                      </span>
                      <span className="block text-[8px] font-mono tracking-[0.1em] text-neutral-500 uppercase mt-1">
                        {systemHealth > 85 ? "Secured" : systemHealth > 70 ? "Warning" : "Compromised"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-4 text-xs font-mono text-neutral-500 flex justify-between">
                <span>Threat Isolation:</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </div>
            </div>

            {/* General Stats widget */}
            <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-6 shadow-2xl space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                AUDIT METRICS
              </h4>
              
              {/* Stat 1 */}
              <div className="flex justify-between items-center bg-black/40 border border-white/[0.02] p-3 rounded-xl">
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-500 font-mono">TOTAL THREATS MITIGATED</span>
                  <span className="text-base font-bold text-white font-mono mt-0.5">{mitigatedCount}</span>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col bg-black/40 border border-white/[0.02] p-3 rounded-xl gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-neutral-500 font-mono">WAN BANDWIDTH LOAD</span>
                  <span className="text-xs font-bold text-white font-mono">{bandwidthLoad}%</span>
                </div>
                {/* Horizontal dynamic bar */}
                <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500" 
                    animate={{ width: `${bandwidthLoad}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
