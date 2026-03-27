'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="px-6 py-24 md:py-32 relative overflow-hidden bg-[#0A0A0F]">

      {/* Radial glow burst behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[600px] h-[600px] rounded-full bg-[#6C63FF]/10 blur-[120px] animate-pulse" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#00D4FF]/8 blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center border-y border-[#242430] py-16 lg:py-24 relative">

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#6C63FF]/40 rounded-tl-md" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#6C63FF]/40 rounded-tr-md" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#6C63FF]/40 rounded-bl-md" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#6C63FF]/40 rounded-br-md" />

        <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-br from-[#F0F0FF] via-[#F0F0FF] to-[#9090A8] bg-clip-text text-transparent">
          Ready to prove what you know?
        </h2>
        <p className="text-[#9090A8] mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Join people building their verified skill portfolio with HorizonX today.
        </p>

        {/* Animated button with pulse ring */}
        <div className="inline-flex flex-col items-center gap-4">
          <div className="relative group">
            {/* Pulse ring */}
            <div className="absolute -inset-1 rounded-xl bg-[#6C63FF]/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            <Link
              href="/register"
              className="relative btn-primary inline-flex items-center gap-2 px-8 py-4 text-base font-bold shadow-[0_0_30px_rgba(108,99,255,0.25)] hover:shadow-[0_0_50px_rgba(108,99,255,0.45)] transition-all duration-300"
            >
              Create Free Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
          {/* Social proof micro-line */}
          <p className="text-[#5A5A70] text-xs font-mono uppercase tracking-widest">
            No credit card required · Free forever
          </p>
        </div>

      </div>
    </section>
  )
}