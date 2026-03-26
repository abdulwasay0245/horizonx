import { ShieldCheck, Crosshair, Share2, Eye } from 'lucide-react'

const reasons = [
  { title: 'Zero Cost', desc: 'No paywalls. No subscriptions. Unrestricted access forever.', icon: <ShieldCheck size={28} className="text-[#F0F0FF]" /> },
  { title: 'Strict Metrics', desc: 'Verification audits display your exact telemetry score, not just a simple completion badge.', icon: <Crosshair size={28} className="text-[#F0F0FF]" /> },
  { title: 'Oauth Verification', desc: 'Single-click frictionless export of credentials to LinkedIn matrices.', icon: <Share2 size={28} className="text-[#F0F0FF]" /> },
  { title: 'Public Directory', desc: 'Hosted unique profiles serving as a direct portfolio terminal for recruiters.', icon: <Eye size={28} className="text-[#F0F0FF]" /> },
]

export default function WhyHorizonX() {
  return (
    <section className="px-6 py-24 md:py-32 max-w-6xl mx-auto bg-[#0A0A0F]">
      <div className="text-center mb-16">
        <h2 className="mb-4">Why HorizonX?</h2>
        <p className="text-[#9090A8] text-lg max-w-xl mx-auto">
          Engineered specifically for candidates who need verifiable proof of work.
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