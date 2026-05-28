export type Project = {
  id: number;
  slug: string;
  title: string;
  desc: string;          // Short description for the home page cards
  longDesc: string;      // Detailed case study for the dedicated project page
  tags: string[];
  imagePath: string;     
  externalLink?: string; 
  span: string;          
  challenge?: string;    // Case study sections
  implementation?: string;
  outcome?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "siem-log-monitoring",
    title: "SIEM Log Monitoring Lab",
    desc: "Investigated security events and practiced SOC workflows using QRadar and Syslog.",
    longDesc: "A detailed breakdown of how I configured a SIEM environment to monitor, triage, and investigate security alerts across a network infrastructure, practicing critical Security Operations Center (SOC) workflows and incident response techniques.",
    tags: ["SIEM", "QRadar", "Syslog"],
    imagePath: "/projects/siem.jpg",
    span: "col-span-1 md:col-span-2",
    challenge: "Aggregating fragmented event logs across heterogeneous machines to detect multi-stage attacks without causing alert fatigue for security operations.",
    implementation: "1. Deployed an event syslog collector sandbox with log forwarding profiles.\n2. Configured IBM Security QRadar SIEM to ingest and parse log streams.\n3. Defined custom correlation rules linking multiple failed authentication logs to sequential directory searches.\n4. Simulated mock brute-force and credential-stuffing threat scripts to test alert thresholds.",
    outcome: "Created operational SOC alert flows, built a security dashboard monitoring threat traffic, and decreased false-positive alarms by 35% using correlation rule tuning."
  },
  {
    id: 2,
    slug: "endpoint-protection",
    title: "Endpoint Protection",
    desc: "Security Monitoring and EDR management.",
    longDesc: "A comprehensive project demonstrating the deployment, management, and continuous monitoring of an enterprise Endpoint Detection & Response (EDR) solution utilizing Seqrite, emphasizing threat hunting and remediation.",
    tags: ["Seqrite", "EDR"],
    imagePath: "/projects/endpoint.jpg",
    span: "col-span-1 md:col-span-1",
    challenge: "Protecting administrative and operational endpoint devices from malicious payloads, zero-day malware, and unauthorized registry modifications across hospitality networks.",
    implementation: "1. Deployed Seqrite EDR client packages across all corporate workstations and servers.\n2. Enforced strict Endpoint compliance profiles restricting USB file storage transfers.\n3. Configured real-time Web Filtering to deny access to known threat categories and command-and-control domains.\n4. Implemented file integrity monitors (FIM) and automated isolate commands for high-risk alerts.",
    outcome: "Achieved 100% endpoint management compliance, successfully blocked malware downloads, and provided immediate host isolation protection for security threats."
  },
  {
    id: 3,
    slug: "enterprise-wifi",
    title: "Enterprise Wi-Fi Optimization",
    desc: "Secure Infrastructure deployment and bandwidth management.",
    longDesc: "An infrastructural overhaul involving the deployment of secure wireless networks, utilizing Ruckus controllers to ensure optimal bandwidth distribution, user isolation, and seamless, stable connectivity for hundreds of concurrent clients.",
    tags: ["Network", "Ruckus"],
    imagePath: "/projects/enterprise.jpg",
    span: "col-span-1 md:col-span-1",
    challenge: "Providing high-speed, stable, and secure wireless internet access for hundreds of concurrent clients across large luxury resort properties with thick concrete structural barriers.",
    implementation: "1. Conducted dynamic site surveys to identify RF interference and coverage gaps.\n2. Managed Ruckus ZoneDirector hardware controllers to orchestrate wireless access points.\n3. Implemented Client Isolation policies on guest SSIDs to prevent peer-to-peer scanning attacks.\n4. Configured Layer 3 VLAN segregation separating corporate POS traffic, administrative networks, and public guests.",
    outcome: "Eliminated wireless dead-zones, secured corporate data from guest access, and maintained stable 99.9% network uptime during high-occupancy guest events."
  },
  {
    id: 4,
    slug: "captive-portal-deployment",
    title: "Captive Portal Deployment",
    desc: "Configured on Sophos XG135 for stable guest connectivity.",
    longDesc: "A security and accessibility project where I engineered a captive portal authentication system via a Sophos XG135 firewall, ensuring authenticated, safe, and logged guest access while maintaining strict isolation from the primary corporate network.",
    tags: ["Sophos", "Firewall"],
    imagePath: "/projects/captive.jpg",
    span: "col-span-1 md:col-span-2",
    challenge: "Enforcing guest authentication, session limits, and proper logging in compliance with local cybersecurity regulations on public guest networks.",
    implementation: "1. Configured a captive portal authentication zone on a Sophos XG135 security gateway.\n2. Deployed RADIUS authentication policies to generate secure access vouchers.\n3. Set traffic shaping profiles restricting guest download speeds to prevent WAN network saturation.\n4. Enabled detailed session log forwarding to secure audit servers for compliance reporting.",
    outcome: "Enforced authenticated guest network access, met local logging storage regulations, and successfully prevented network bandwidth exhaustion."
  }
];
