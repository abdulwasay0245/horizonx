import { User, Target, Zap, FileText, TerminalSquare } from 'lucide-react'

const steps = [
  { step: '01', title: 'Sign Up', desc: 'Create your free account in 30 seconds.', icon: <User size={24} className="text-[#6C63FF]" /> },
  { step: '02', title: 'Pick a Track', desc: 'Pick a topic you want to learn.', icon: <Target size={24} className="text-[#6C63FF]" /> },
  { step: '03', title: 'Complete Tasks', desc: 'Complete hands-on tasks at your own pace.', icon: <Zap size={24} className="text-[#6C63FF]" /> },
  { step: '04', title: 'Take the Quiz', desc: 'Answer 20 questions to test your knowledge.', icon: <FileText size={24} className="text-[#6C63FF]" /> },
  { step: '05', title: 'Earn Your Badge', desc: 'Earn a verified skill badge for your profile.', icon: <TerminalSquare size={24} className="text-[#6C63FF]" /> },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 md:py-32 max-w-6xl mx-auto bg-[#0A0A0F]">
      <div className="text-center mb-16">
        <h2 className="mb-4">How It Works</h2>
        <p className="text-[#9090A8] text-lg max-w-xl mx-auto">
          Five simple steps to prove your skills.
        </p>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="flex overflow-x-auto pb-8 -mx-6 px-6 gap-4 snap-x scrollbar-hide md:hidden">
        {steps.map((item) => (
          <div key={item.step} className="vercel-card min-w-[240px] snap-center flex flex-col items-start text-left shrink-0">
            <div className="w-12 h-12 bg-[#1A1A24] border border-[#242430] rounded-xl flex items-center justify-center mb-5">
              {item.icon}
            </div>
            <div className="text-[#5A5A70] font-mono text-[10px] font-bold tracking-[0.08em] uppercase mb-2">
              STEP {item.step}
            </div>
            <h3 className="text-[#F0F0FF] font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-[#9090A8] text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Desktop: connected timeline */}
      <div className="hidden md:block relative">
        {/* Connector line behind the cards */}
        <div className="absolute top-[30px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#3A3A50] to-transparent pointer-events-none" />

        <div className="grid grid-cols-5 gap-4 relative">
          {steps.map((item, index) => (
            <div key={item.step} className="flex flex-col items-start text-left group">
              {/* Icon with connector dot on the line */}
              <div className="relative mb-6 w-full flex flex-col items-start">
                {/* Dot on the timeline */}
                <div className="absolute -top-[17px] left-6 w-2.5 h-2.5 rounded-full bg-[#6C63FF] ring-4 ring-[#0A0A0F] z-10 group-hover:ring-[#6C63FF]/20 transition-all duration-300" />
                {/* Icon box */}
                <div className="w-12 h-12 bg-[#1A1A24] border border-[#242430] rounded-xl flex items-center justify-center group-hover:border-[#6C63FF]/40 group-hover:bg-[#6C63FF]/5 transition-all duration-300 mt-4">
                  {item.icon}
                </div>
              </div>

              <div className="text-[#5A5A70] font-mono text-[10px] font-bold tracking-[0.08em] uppercase mb-2">
                STEP {item.step}
              </div>
              <h3 className="text-[#F0F0FF] font-semibold text-base mb-1 leading-tight">
                {item.title}
              </h3>
              <p className="text-[#9090A8] text-sm leading-relaxed">{item.desc}</p>

              {/* Progress indicator — filled for all except last */}
              {index < steps.length - 1 && (
                <div className="absolute top-[30px] left-[calc(100%_-_10px)] w-8 hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}