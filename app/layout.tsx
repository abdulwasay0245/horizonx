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
    default: 'HorizonX — Build Skills. Get Certified.',
    template: '%s | HorizonX',
  },
  description:
    'HorizonX is a free learning platform where you build real-world skills through guided tracks, submit portfolio-ready projects, and earn verified certificates.',
  keywords: [
    'learn to code',
    'free certificate',
    'skills platform',
    'online learning',
    'HorizonX',
    'portfolio projects',
  ],
  openGraph: {
    title: 'HorizonX — Build Skills. Get Certified.',
    description:
      'Free guided learning tracks, portfolio-ready projects, and verified certificates.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'HorizonX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HorizonX — Build Skills. Get Certified.',
    description:
      'Free guided learning tracks, portfolio-ready projects, and verified certificates.',
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
