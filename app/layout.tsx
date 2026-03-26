import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'HorizonX — Technical Verification & Skill Analysis',
    template: '%s | HorizonX',
  },
  description:
    'HorizonX is a professional platform where you build real-world skills through guided technical tracks, submit execution records, and obtain verifiable skill analysis.',
  keywords: [
    'technical verification',
    'skill analysis',
    'developer platform',
    'online learning',
    'HorizonX',
    'portfolio projects',
  ],
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'HorizonX — Technical Verification & Skill Analysis',
    description:
      'Execution-driven technical pathways, portfolio-ready projects, and verifiable skill analysis.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'HorizonX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HorizonX — Technical Verification & Skill Analysis',
    description:
      'Execution-driven technical pathways, portfolio-ready projects, and verifiable skill analysis.',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0F] text-[#F0F0FF]">{children}</body>
    </html>
  );
}
