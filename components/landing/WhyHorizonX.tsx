import { ShieldCheck, Crosshair, Share2, Eye } from 'lucide-react'

const reasons = [
  { title: 'Zero Cost', desc: 'No paywalls. No subscriptions. Free forever.', icon: <ShieldCheck size={28} className="text-[#00C896]" /> },
  { title: 'Real Results', desc: 'Your profile shows your actual score, not just a pass/fail badge.', icon: <Crosshair size={28} className="text-[#6C63FF]" /> },
  { title: 'Easy Sharing', desc: 'Share your achievements on LinkedIn with one click.', icon: <Share2 size={28} className="text-[#00D4FF]" /> },
  { title: 'Public Profile', desc: 'Your profile is public so recruiters can find and verify your skills.', icon: <Eye size={28} className="text-[#FFB340]" /> },
]

export default function WhyHorizonX() {
  return (
    <section className="px-6 py-24 md:py-32 max-w-6xl mx-auto bg-[#EAEFF5]">
      <div className="text-center mb-16 lg:mb-20">
        <h2 className="mb-4 text-4xl lg:text-5xl text-[#2D3748]">Why HorizonX?</h2>
        <p className="text-[#4A5568] text-lg max-w-xl mx-auto font-medium">
          Built for people who want to show what they can actually do.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((item) => (
          <div key={item.title} className="clay-card flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#F5F8FA] rounded-3xl flex items-center justify-center shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),inset_-2px_-2px_5px_rgba(0,0,0,0.05),3px_3px_6px_#c8d0e7] mb-6">
              {item.icon}
            </div>
            <h3 className="text-[#2D3748] font-black text-xl mb-3">{item.title}</h3>
            <p className="text-[#4A5568] text-base leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}