import { User, Target, Zap, FileText, TerminalSquare } from 'lucide-react'

const steps = [
  { step: '01', title: 'Sign Up', desc: 'Create your free account in 30 seconds.', icon: <User size={28} className="text-[#6C63FF]" /> },
  { step: '02', title: 'Pick a Track', desc: 'Pick a topic you want to learn.', icon: <Target size={28} className="text-[#6C63FF]" /> },
  { step: '03', title: 'Complete Tasks', desc: 'Complete hands-on tasks at your own pace.', icon: <Zap size={28} className="text-[#6C63FF]" /> },
  { step: '04', title: 'Take the Quiz', desc: 'Answer 20 questions to test your knowledge.', icon: <FileText size={28} className="text-[#6C63FF]" /> },
  { step: '05', title: 'Earn Your Badge', desc: 'Earn a verified skill badge for your profile.', icon: <TerminalSquare size={28} className="text-[#6C63FF]" /> },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 md:py-32 w-full bg-[#EAEFF5]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="mb-4 text-4xl lg:text-5xl text-[#2D3748]">How It Works</h2>
          <p className="text-[#4A5568] text-lg max-w-xl mx-auto font-medium">
            Five simple steps to prove your skills and build your portfolio.
          </p>
        </div>

        <div className="relative">
          {/* Connector line behind the nodes (Desktop only) */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-3 bg-[#F5F8FA] rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.06),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] pointer-events-none" />

          {/* Steps container (Flex col on mobile, grid on desktop) */}
          <div className="flex flex-col md:grid md:grid-cols-5 gap-10 md:gap-4 relative">
            {steps.map((item, index) => (
              <div key={item.step} className="flex flex-col items-center md:items-start text-center md:text-left group relative">
                
                {/* Connecting line for Mobile (vertical) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute top-[88px] bottom-[-40px] left-1/2 -translate-x-1/2 w-2 bg-[#F5F8FA] rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.06),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] -z-10" />
                )}

                {/* Icon Circle (Clay style) */}
                <div className="relative mb-6 z-10 w-full flex flex-col items-center md:items-start">
                  <div className="w-22 h-22 bg-[#EAEFF5] rounded-[32px] flex items-center justify-center transition-all duration-300 shadow-[8px_8px_16px_#c8d0e7,-8px_-8px_16px_#ffffff,inset_-4px_-4px_8px_rgba(0,0,0,0.04),inset_4px_4px_8px_rgba(255,255,255,0.8)] border border-white/50 group-hover:-translate-y-2">
                    {item.icon}
                  </div>
                </div>

                <div className="text-[#6C63FF] font-mono text-sm font-black tracking-widest uppercase mb-2 drop-shadow-sm">
                  STEP {item.step}
                </div>
                <h3 className="text-[#2D3748] font-black text-xl mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#4A5568] text-base leading-relaxed font-medium px-4 md:px-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}