"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Search, ShieldAlert, CheckCircle, XCircle, 
  Terminal, Shield, FileText, Mail, Eye, Key, WifiOff, RefreshCw
} from "lucide-react";

type TabId = "ad" | "forensics";

interface AdUser {
  id: string;
  name: string;
  role: string;
  samAccount: string;
  ou: string;
  status: "active" | "disabled" | "processing";
  compliance: "secure" | "compromised";
  lastLogon: string;
}

interface EmailHeader {
  field: string;
  value: string;
  status: "valid" | "warning" | "failed";
  desc: string;
}

export default function AdForensicsSuite() {
  const [activeTab, setActiveTab] = useState<TabId>("ad");
  
  // AD DS States
  const [adUsers, setAdUsers] = useState<AdUser[]>([
    { id: "u-1", name: "Basharat Salam", role: "Domain Admin", samAccount: "admin.salam", ou: "Administrators", status: "active", compliance: "secure", lastLogon: "10 mins ago" },
    { id: "u-2", name: "Mahesh Khattana", role: "Sr. IT Manager", samAccount: "manager.mahesh", ou: "Staff / IT Dept", status: "active", compliance: "secure", lastLogon: "2 hours ago" },
    { id: "u-3", name: "Frontdesk Shared Host", role: "POS Operator", samAccount: "frontdesk.guest", ou: "POS Terminals", status: "active", compliance: "compromised", lastLogon: "5 mins ago" },
    { id: "u-4", name: "Backoffice Backup Server", role: "Service Account", samAccount: "svc.backup", ou: "Service Accounts", status: "active", compliance: "secure", lastLogon: "Daily (02:00 AM)" }
  ]);
  const [selectedUser, setSelectedUser] = useState<AdUser | null>(null);

  // Forensics States
  const [pcapQuery, setPcapQuery] = useState("");
  const [selectedPacket, setSelectedPacket] = useState<number | null>(null);
  
  const headersList: EmailHeader[] = [
    { field: "From", value: "account-update@sophos-support-portal.net (Spoofed)", status: "failed", desc: "This domain is unregistered and spoofing the real sophos.com security server." },
    { field: "Return-Path", value: "spammer-gateway@secure-mail-relay.ru", status: "failed", desc: "Mismatched return path indicates malicious redirection rules." },
    { field: "SPF (Sender Policy Framework)", value: "SoftFail (IP 185.220.101.4 not authorized)", status: "failed", desc: "The sending IP is not authorized by the domain owner to send mail." },
    { field: "DKIM (DomainKeys Identified Mail)", value: "invalid (Signature check failed)", status: "failed", desc: "Cryptographic signature is broken, indicating payload tempering." },
    { field: "DMARC (Domain-based Message Auth)", value: "FAIL (p=reject policy active)", status: "failed", desc: "The domain failed both SPF and DKIM auditing; mail should be quarantined." }
  ];

  const packetStream = [
    { id: 1, proto: "TCP", src: "192.168.1.108", dest: "185.220.101.4", len: 1480, info: "FTP DATA CONNECT (File transfer: backups.zip)", payload: "USER backoffice_backup\nPASS KhyberPass123!\nSTOR backups.zip\n530 Login incorrect." },
    { id: 2, proto: "DNS", src: "192.168.1.108", dest: "192.168.1.1", len: 78, info: "Standard query A malware-download-server.cc", payload: "DNS Query: malware-download-server.cc\nRecord Type: A\nClass: IN" },
    { id: 3, proto: "HTTP", src: "192.168.1.108", dest: "185.220.101.4", len: 540, info: "POST /api/exfiltrate HTTP/1.1", payload: "POST /api/exfiltrate HTTP/1.1\nHost: 185.220.101.4\nUser-Agent: Mozilla/5.0\nContent-Length: 42\n\n{\"leak\": \"domain_controller_backup_hashes\"}" },
    { id: 4, proto: "HTTPS", src: "192.168.1.10", dest: "52.84.120.18", len: 980, info: "TLS v1.3 Handshake completed", payload: "Encrypted payload. TLS 1.3 session established. Key Exchange: ECDHE." }
  ];

  const handleDisableUser = (id: string) => {
    setAdUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "processing" } : u))
    );

    setTimeout(() => {
      setAdUsers((prev) =>
        prev.map((u) => {
          if (u.id === id) {
            const updated = { ...u, status: "disabled" as const, compliance: "secure" as const };
            if (selectedUser?.id === id) setSelectedUser(updated);
            return updated;
          }
          return u;
        })
      );
    }, 1500);
  };

  const handleEnableUser = (id: string) => {
    setAdUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "processing" } : u))
    );

    setTimeout(() => {
      setAdUsers((prev) =>
        prev.map((u) => {
          if (u.id === id) {
            const updated = { ...u, status: "active" as const };
            if (selectedUser?.id === id) setSelectedUser(updated);
            return updated;
          }
          return u;
        })
      );
    }, 1500);
  };

  return (
    <section id="ad-forensics" className="relative w-full py-24 px-6 md:px-24 bg-[#050505] border-t border-white/[0.05]">
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-cyan-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header with Custom Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-500 animate-pulse" /> Cyber Lab Suite
            </h3>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light">
              AD DS &amp; <span className="font-bold text-white">Forensics.</span>
            </h2>
            <p className="text-neutral-400 text-base md:text-lg max-w-2xl mt-4 font-light">
              Toggle between the Active Directory account control hub and the PCAP packet forensics/email header analysis deck.
            </p>
          </div>

          {/* Tabs switch */}
          <div className="flex bg-neutral-900 border border-white/10 p-1 rounded-2xl shrink-0">
            <button
              onClick={() => setActiveTab("ad")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "ad" ? "bg-white text-black shadow-lg" : "text-neutral-500 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" /> Active Directory
            </button>
            <button
              onClick={() => setActiveTab("forensics")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "forensics" ? "bg-white text-black shadow-lg" : "text-neutral-500 hover:text-white"
              }`}
            >
              <Search className="w-4 h-4" /> Cyber Forensics
            </button>
          </div>
        </div>

        {/* Dynamic content wrapper */}
        <AnimatePresence mode="wait">
          {activeTab === "ad" ? (
            <motion.div
              key="ad"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
            >
              {/* Users list tree panel (Left 2 cols) */}
              <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 text-xs text-neutral-500 font-mono">
                    <span>DOMAIN CONTROLLER: DC-01</span>
                    <span>ORGANIZATION: CORP.KHYBER.LOCAL</span>
                  </div>

                  {/* Users list UI */}
                  <div className="space-y-3">
                    {adUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className={`border rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:bg-white/[0.02] transition-all ${
                          selectedUser?.id === user.id
                            ? "border-cyan-500/40 bg-cyan-950/5"
                            : "border-white/[0.05] bg-black/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            user.status === "disabled"
                              ? "bg-neutral-600"
                              : user.compliance === "compromised"
                              ? "bg-red-500 animate-pulse"
                              : "bg-emerald-500"
                          }`} />
                          <div>
                            <h4 className="text-sm font-semibold text-white">{user.name}</h4>
                            <span className="text-[10px] font-mono text-neutral-500">
                              OU: {user.ou} | Login: {user.samAccount}
                            </span>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${
                            user.status === "disabled"
                              ? "bg-neutral-900 text-neutral-500 border border-neutral-800"
                              : user.compliance === "compromised"
                              ? "bg-red-950/20 text-red-400 border border-red-500/20"
                              : "bg-emerald-950/20 text-emerald-400 border border-emerald-500/20"
                          }`}>
                            {user.status === "disabled" ? "disabled" : user.compliance === "compromised" ? "compromised" : "compliant"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center text-[10px] text-neutral-500 italic mt-8 font-mono">
                  ℹ️ Click on a Domain User profile to open Active Directory settings and manage access levels.
                </div>
              </div>

              {/* User management sidebar (Right column) */}
              <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl min-h-[420px]">
                {selectedUser ? (
                  <div className="h-full flex flex-col justify-between">
                    <div className="space-y-5">
                      <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                        <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                          <Users className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white leading-tight">{selectedUser.name}</h4>
                          <span className="text-[10px] font-mono text-neutral-500">{selectedUser.role}</span>
                        </div>
                      </div>

                      {/* Info logs */}
                      <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">AD ATTRIBUTES</h5>
                      <div className="space-y-2">
                        {[
                          { label: "samAccountName", value: selectedUser.samAccount },
                          { label: "DistinguishedName", value: `CN=${selectedUser.samAccount},OU=${selectedUser.ou.replace(/\s+/g, "")},DC=khyber,DC=local` },
                          { label: "Last Logon Timestamp", value: selectedUser.lastLogon },
                          { label: "PowerShell Restricted", value: selectedUser.role === "Domain Admin" ? "FALSE (Bypass)" : "TRUE (GPO Active)" }
                        ].map((attr, idx) => (
                          <div key={idx} className="bg-black/60 border border-white/[0.02] p-2.5 rounded-xl font-mono text-[9px] text-neutral-400">
                            <span className="text-neutral-600 block mb-0.5">{attr.label}</span>
                            <span className="text-white select-all break-all">{attr.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8">
                      {selectedUser.status === "active" ? (
                        <button
                          onClick={() => handleDisableUser(selectedUser.id)}
                          className="w-full py-2.5 px-4 bg-red-950/20 hover:bg-red-950/50 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                        >
                          <WifiOff className="w-3.5 h-3.5" /> Disable User Account
                        </button>
                      ) : selectedUser.status === "processing" ? (
                        <div className="w-full py-2.5 px-4 bg-neutral-900 border border-white/5 text-neutral-400 rounded-xl font-mono text-xs flex items-center justify-center gap-1.5 select-none">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Processing request...
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEnableUser(selectedUser.id)}
                          className="w-full py-2.5 px-4 bg-emerald-950/20 hover:bg-emerald-950/50 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Enable User Account
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-14 h-14 bg-white/[0.02] border border-dashed border-white/10 rounded-full flex items-center justify-center mb-6 text-neutral-500 animate-pulse">
                      <Users className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-light text-white mb-2">Select User</h4>
                    <p className="text-xs text-neutral-500 max-w-xs font-light leading-relaxed">
                      Select a domain operator on the left to review DistinguishedName strings and deploy lockouts.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="forensics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
            >
              {/* Phishing Analyzer (Left Column) */}
              <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-cyan-400" /> PHISHING HEADER AUDIT
                </h4>

                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Analyze security configurations of a spoofed security alert email from an untrusted gateway.
                </p>

                <div className="space-y-2 flex-1 overflow-y-auto max-h-[360px] scrollbar-thin">
                  {headersList.map((h, i) => (
                    <div key={i} className="bg-black/60 border border-white/[0.02] p-3 rounded-xl space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-neutral-500">{h.field}:</span>
                        <span className="text-red-400 font-bold">FAIL</span>
                      </div>
                      <p className="text-[10px] font-mono text-white select-all break-all">{h.value}</p>
                      <p className="text-[9px] text-neutral-500 leading-normal">{h.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packet Stream wireshark style (Middle & Right Columns) */}
              <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-cyan-400" /> PCAP PACKET CAPTURE (WS-102 LOG)
                  </h4>

                  {/* Packet list */}
                  <div className="space-y-2">
                    {packetStream.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPacket(p.id)}
                        className={`p-3 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 cursor-pointer transition-all ${
                          selectedPacket === p.id
                            ? "border-cyan-500/40 bg-cyan-950/5"
                            : "border-white/[0.03] bg-black/40 hover:bg-white/[0.01]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                            p.proto === "TCP"
                              ? "bg-blue-950/30 text-blue-400 border border-blue-500/20"
                              : p.proto === "DNS"
                              ? "bg-purple-950/30 text-purple-400 border border-purple-500/20"
                              : p.proto === "HTTP"
                              ? "bg-amber-950/30 text-amber-400 border border-amber-500/20"
                              : "bg-emerald-950/30 text-emerald-400 border border-emerald-500/20"
                          }`}>
                            {p.proto}
                          </span>
                          <div>
                            <span className="text-[10px] font-mono text-neutral-500">
                              {p.src} ➔ {p.dest}
                            </span>
                            <h5 className="text-xs text-white font-medium mt-0.5">{p.info}</h5>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-600 self-end sm:self-center">
                          {p.len} bytes
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Packet payload info */}
                  <div className="mt-5 border border-white/5 bg-black rounded-2xl p-4">
                    <span className="text-[10px] font-mono text-neutral-600 block mb-2 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-cyan-400" /> DECIPHERED PACKET DECODE
                    </span>
                    <pre className="font-mono text-[10px] text-neutral-400 whitespace-pre-wrap leading-relaxed select-all bg-[#030303] p-3 rounded-xl border border-white/[0.02] max-h-36 overflow-y-auto scrollbar-thin">
                      {selectedPacket !== null
                        ? packetStream.find((p) => p.id === selectedPacket)?.payload
                        : "Select any packet capture above to extract cleartext connection data."}
                    </pre>
                  </div>
                </div>

                <div className="text-center text-[10px] text-neutral-500 italic mt-6 font-mono">
                  ℹ️ Click a PCAP packet to extract cleartext credentials or command-and-control connection details.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
