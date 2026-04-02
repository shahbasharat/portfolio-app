import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HomeButton from "@/components/HomeButton";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Basharat Salam | System & Network Administrator",
  description: "Portfolio of Basharat Salam, a dedicated System Admin and Network Administrator specializing in enterprise IT environments, cybersecurity, and infrastructure.",
  keywords: ["System Administrator", "Network Administrator", "Cybersecurity", "Sophos Firewall", "CCNA", "IT Support", "Seqrite EDR", "Portfolio"],
  authors: [{ name: "Basharat Salam" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/favicon-32x32.png",
  },
  openGraph: {
    title: "Basharat Salam | System & Network Administrator",
    description: "Explore the technical portfolio, cybersecurity projects, and enterprise networking implementations of Basharat Salam.",
    url: "https://v0-basharat.vercel.app",
    siteName: "Basharat Salam Portfolio",
    type: "website",
    images: [
      {
        url: "https://v0-basharat.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Basharat Salam Portfolio",
      },
    ],
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
        <HomeButton />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}