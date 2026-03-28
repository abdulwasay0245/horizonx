'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="px-6 py-24 md:py-32 relative overflow-hidden bg-[#EAEFF5]">

      {/* Radial soft glow burst behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[600px] h-[600px] rounded-full bg-[#6C63FF]/5 blur-[80px] animate-pulse" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#00D4FF] opacity-5 blur-[60px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center clay-card !py-20 relative border border-white/50">

        {/* Decorative corner accents (clay style outer dots) */}
        <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[#EAEFF5] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]" />
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#EAEFF5] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]" />
        <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-[#EAEFF5] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]" />
        <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#EAEFF5] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]" />

        <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#2D3748] tracking-tight">
          Ready to prove what you know?
        </h2>
        <p className="text-[#4A5568] mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
          Join people building their verified skill portfolio with HorizonX today.
        </p>

        {/* Animated button */}
        <div className="inline-flex flex-col items-center gap-6">
          <div className="relative group">
            <Link
              href="/register"
              className="clay-btn-primary inline-flex items-center gap-2 text-lg"
            >
              Create Free Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
          {/* Social proof micro-line */}
          <p className="text-[#718096] text-xs font-mono uppercase font-bold tracking-widest bg-[#F5F8FA] px-4 py-2 rounded-xl shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.03),2px_2px_4px_#c8d0e7]">
            No credit card required · Free forever
          </p>
        </div>

      </div>
    </section>
  )
}