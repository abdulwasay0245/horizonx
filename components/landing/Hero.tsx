import Link from 'next/link'
import { ArrowRight, Terminal } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative px-6 pt-32 pb-24 max-w-6xl mx-auto min-h-[90vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          <div className="mb-8 border-l-2 border-[#6C63FF] pl-3">
             <span className="font-mono text-[11px] text-[#5A5A70] font-semibold uppercase tracking-[0.08em]">
               Skill Assessment Platform
             </span>
          </div>
          
          <h1 className="mb-6">
            Prove What You <br />
            <span className="text-[#6C63FF]">Actually</span> Know.
          </h1>
          
          <p className="text-[#9090A8] text-lg max-w-lg mb-10">
            Execute real-world technical assignments, pass rigorous evaluations, and generate cryptographic technical audits directly synchronized with your professional profile.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
            <Link 
              href="/register" 
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 glow-primary"
            >
              Start Building <ArrowRight size={18} />
            </Link>
            <Link 
              href="#framework" 
              className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Terminal size={18} />
              Read Documentation
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[#5A5A70] font-mono text-[11px] uppercase tracking-wider">
             <span>2,400+ Students</span>
             <span className="w-px h-3 bg-[#242430]" />
             <span>12 Tracks</span>
             <span className="w-px h-3 bg-[#242430]" />
             <span>Free Forever</span>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end perspective-[1000px]">
           {/* Subtle Dot Grid Background */}
           <div className="absolute inset-0 bg-dot-grid opacity-50 -z-10 scale-[1.5] translate-x-8" />
           
           {/* Mock Verification Record */}
           <div className="w-full max-w-[400px] bg-[#111118] border border-[#242430] rounded-2xl p-8 -rotate-2 glow-primary hover:rotate-0 hover:scale-[1.02] transition-all duration-500 relative overflow-hidden group">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#6C63FF] to-[#00D4FF]" />
              
              <div className="mb-8">
                 <p className="font-semibold uppercase tracking-[0.08em] text-[#5A5A70] text-[10px] mb-6">Technical Execution Record</p>
                 <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Rao Noman</h3>
                 <span className="badge-advanced">Frontend Architecture</span>
              </div>

              <div className="flex items-end justify-between mb-8 border-b border-[#242430] pb-6">
                 <div>
                    <p className="text-[#5A5A70] font-mono text-[10px] uppercase mb-1">Final Score</p>
                    <div className="font-mono text-5xl font-black text-[#6C63FF] tracking-tighter">94%</div>
                 </div>
                 <div className="text-right">
                    <p className="text-[#5A5A70] font-mono text-[10px] uppercase mb-1">Passed On</p>
                    <p className="font-mono text-sm text-[#F0F0FF]">Jan 24, 2026</p>
                 </div>
              </div>

              <div>
                 <div className="flex justify-between text-[#5A5A70] font-mono text-[10px] mb-2">
                    <span>Proficiency Threshold</span>
                    <span className="text-[#00C896]">Exceeded</span>
                 </div>
                 <div className="h-1.5 w-full bg-[#1A1A24] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] rounded-full w-[94%]" />
                 </div>
              </div>

              <div className="absolute bottom-[-20%] right-[-10%] w-[150px] h-[150px] bg-[#6C63FF]/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#6C63FF]/10 transition-colors duration-500" />
           </div>
        </div>
        
      </div>
    </section>
  )
}