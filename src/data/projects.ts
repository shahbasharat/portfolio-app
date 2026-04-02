export type Project = {
  id: number;
  slug: string;
  title: string;
  desc: string;          // Short description for the home page cards
  longDesc: string;      // Detailed case study for the dedicated project page
  tags: string[];
  imagePath: string;     // The user can fill this in with their image url or path (e.g. "/siem.png")
  externalLink?: string; // Optional if they still want a link out
  span: string;          // Tailwind class for layout width on homepage
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
    span: "col-span-1 md:col-span-2"
  },
  {
    id: 2,
    slug: "endpoint-protection",
    title: "Endpoint Protection",
    desc: "Security Monitoring and EDR management.",
    longDesc: "A comprehensive project demonstrating the deployment, management, and continuous monitoring of an enterprise Endpoint Detection & Response (EDR) solution utilizing Seqrite, emphasizing threat hunting and remediation.",
    tags: ["Seqrite", "EDR"],
    imagePath: "/projects/endpoint.jpg",
    span: "col-span-1 md:col-span-1"
  },
  {
    id: 3,
    slug: "enterprise-wifi",
    title: "Enterprise Wi-Fi Optimization",
    desc: "Secure Infrastructure deployment and bandwidth management.",
    longDesc: "An infrastructural overhaul involving the deployment of secure wireless networks, utilizing Ruckus controllers to ensure optimal bandwidth distribution, user isolation, and seamless, stable connectivity for hundreds of concurrent clients.",
    tags: ["Network", "Ruckus"],
    imagePath: "/projects/enterprise.jpg",
    span: "col-span-1 md:col-span-1"
  },
  {
    id: 4,
    slug: "captive-portal-deployment",
    title: "Captive Portal Deployment",
    desc: "Configured on Sophos XG135 for stable guest connectivity.",
    longDesc: "A security and accessibility project where I engineered a captive portal authentication system via a Sophos XG135 firewall, ensuring authenticated, safe, and logged guest access while maintaining strict isolation from the primary corporate network.",
    tags: ["Sophos", "Firewall"],
    imagePath: "/projects/captive.jpg",
    span: "col-span-1 md:col-span-2"
  }
];
