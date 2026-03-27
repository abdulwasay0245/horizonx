import { ShieldCheck, Crosshair, Share2, Eye } from 'lucide-react'

const reasons = [
  { title: 'Zero Cost', desc: 'No paywalls. No subscriptions. Free forever.', icon: <ShieldCheck size={28} className="text-[#F0F0FF]" /> },
  { title: 'Real Results', desc: 'Your profile shows your actual score, not just a pass/fail badge.', icon: <Crosshair size={28} className="text-[#F0F0FF]" /> },
  { title: 'Easy Sharing', desc: 'Share your achievements on LinkedIn with one click.', icon: <Share2 size={28} className="text-[#F0F0FF]" /> },
  { title: 'Public Profile', desc: 'Your profile is public so recruiters can find and verify your skills.', icon: <Eye size={28} className="text-[#F0F0FF]" /> },
]

export default function WhyHorizonX() {
  return (
    <section className="px-6 py-24 md:py-32 max-w-6xl mx-auto bg-[#0A0A0F]">
      <div className="text-center mb-16">
        <h2 className="mb-4">Why HorizonX?</h2>
        <p className="text-[#9090A8] text-lg max-w-xl mx-auto">
          Built for people who want to show what they can actually do.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((item) => (
          <div key={item.title} className="vercel-card flex flex-col items-start">
            <div className="w-12 h-12 bg-[#1A1A24] border border-[#242430] rounded-xl flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h3 className="text-[#F0F0FF] font-semibold text-lg mb-3">{item.title}</h3>
            <p className="text-[#9090A8] text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}