import { User, Target, Zap, FileText, TerminalSquare } from 'lucide-react'

const steps = [
  { step: '01', title: 'Sign Up', desc: 'Initialize your free account in 30 seconds.', icon: <User size={24} className="text-[#6C63FF]" /> },
  { step: '02', title: 'Pick a Track', desc: 'Select a domain and difficulty parameter.', icon: <Target size={24} className="text-[#6C63FF]" /> },
  { step: '03', title: 'Execute Tasks', desc: 'Resolve real-world technical assignments.', icon: <Zap size={24} className="text-[#6C63FF]" /> },
  { step: '04', title: 'Pass Evaluation', desc: '20 rigorous MCQ questions to verify proficiency.', icon: <FileText size={24} className="text-[#6C63FF]" /> },
  { step: '05', title: 'Verify Skills', desc: 'Mint a cryptographic audit record with your telemetry.', icon: <TerminalSquare size={24} className="text-[#6C63FF]" /> },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 md:py-32 max-w-6xl mx-auto bg-[#0A0A0F]">
      <div className="text-center mb-16">
        <h2 className="mb-4">Operational Workflow</h2>
        <p className="text-[#9090A8] text-lg max-w-xl mx-auto">
          Five deterministic steps to prove your technical capabilities.
        </p>
      </div>
      
      <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-5 gap-6 snap-x scrollbar-hide">
        {steps.map((item) => (
          <div key={item.step} className="vercel-card min-w-[260px] md:min-w-0 snap-center flex flex-col items-start justify-start text-left">
            <div className="w-12 h-12 bg-[#1A1A24] border border-[#242430] rounded-xl flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <div className="text-[#5A5A70] font-mono text-[10px] font-bold tracking-[0.08em] uppercase mb-3">
               STEP {item.step}
            </div>
            <h3 className="text-[#F0F0FF] font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-[#9090A8] text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}