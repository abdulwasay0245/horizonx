import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="px-6 py-24 md:py-32 relative overflow-hidden bg-[#0A0A0F]">
      <div className="max-w-4xl mx-auto text-center border-y border-[#242430] py-16 lg:py-24 relative glow-primary before:content-[''] before:absolute before:inset-0 before:bg-[#6C63FF]/5 before:-z-10 before:blur-[100px]">
        <h2 className="text-4xl md:text-5xl font-black mb-6">
          Ready to prove what you know?
        </h2>
        <p className="text-[#9090A8] mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Join people building their verified skill portfolio with HorizonX today.
        </p>
        <Link
          href="/register"
          className="btn-primary inline-flex items-center gap-2 mx-auto"
        >
          Create Free Account <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}