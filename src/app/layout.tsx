import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HomeButton from "@/components/HomeButton";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import { Analytics } from "@vercel/analytics/react";
import ParticleBackground from "@/components/ParticleBackground";
import KonamiCode from "@/components/KonamiCode";
import Navbar from "@/components/Navbar";
import FilmGrain from "@/components/FilmGrain";
import AvailabilityBadge from "@/components/AvailabilityBadge";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://basharatsalam.vercel.app";

export const metadata: Metadata = {
  title: "Basharat Salam | System & Network Administrator",
  description: "Portfolio of Basharat Salam — System Admin and Network Administrator specializing in enterprise IT, Sophos firewall, Seqrite EDR, Ruckus Wi-Fi, and cybersecurity.",
  keywords: ["System Administrator", "Network Administrator", "Cybersecurity", "Sophos Firewall", "CCNA", "IT Support", "Seqrite EDR", "Ruckus", "Active Directory", "Portfolio", "Basharat Salam"],
  authors: [{ name: "Basharat Salam", url: BASE_URL }],
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/favicon-32x32.png",
  },
  openGraph: {
    title: "Basharat Salam | System & Network Administrator",
    description: "Explore the technical portfolio, cybersecurity projects, and enterprise networking implementations of Basharat Salam. Open to work — Sophos, EDR, Ruckus, AD specialist.",
    url: BASE_URL,
    siteName: "Basharat Salam Portfolio",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Basharat Salam — System & Network Administrator Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Basharat Salam | System & Network Administrator",
    description: "Enterprise IT professional specializing in Sophos, EDR, Ruckus & Active Directory. Open to work.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-24">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <FilmGrain />
        <Navbar />
        <ParticleBackground />
        <LoadingScreen />
        <ScrollProgress />
        <CustomCursor />
        <KonamiCode />
        <HomeButton />
        <ScrollToTop />
        <AvailabilityBadge />
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Basharat Salam",
              "jobTitle": "System & Network Administrator",
              "url": BASE_URL,
              "email": "shahbasharat577@gmail.com",
              "sameAs": [
                "https://www.linkedin.com/in/basharatsalam",
                "https://github.com/shahbasharat",
                "https://tryhackme.com/p/sbasharat577"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}