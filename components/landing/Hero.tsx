import Link from 'next/link'
import { ArrowRight, Terminal } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative px-6 pt-32 pb-24 max-w-6xl mx-auto min-h-[90vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <div className="mb-8 border-l-4 lg:border-l-4 border-[#6C63FF] pl-4 lg:pl-4 py-1">
             <span className="font-mono text-[12px] text-[#6C63FF] font-black uppercase tracking-[0.1em]">
               Learn. Build. Get Verified.
             </span>
          </div>
          
          <h1 className="mb-6 text-5xl lg:text-6xl text-[#2D3748] tracking-tight leading-tight">
            Prove What You <br />
            <span className="text-[#6C63FF]">Actually</span> Know.
          </h1>
          
          <p className="text-[#4A5568] text-lg lg:text-xl max-w-xl mb-10 font-medium leading-relaxed">
           Complete real-world tasks, pass skill assessments, and earn a verified skill badge linked to your profile in a beautiful workspace.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto mb-10">
            <Link 
              href="/register" 
              className="clay-btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link 
              href="#how-it-works" 
              className="clay-btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Terminal size={18} />
              See How It Works
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[#718096] font-mono text-[11px] uppercase tracking-widest font-bold">
             <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF]" />
             <span>8 Tracks available</span>
             <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF]" />
             <span>Free Forever</span>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
           {/* Soft Clay Background Blob */}
           <div className="absolute inset-0 bg-[#6C63FF]/5 -z-10 scale-[1.2] lg:translate-x-8 rounded-full blur-[80px]" />
           
           {/* Mock Verification Record (Clay Card) */}
           <div className="w-full max-w-[400px] clay-card !p-8 -rotate-2 hover:rotate-0 transition-transform duration-500 relative group overflow-hidden">
              
              <div className="mb-8 relative z-10">
                 <p className="font-bold uppercase tracking-[0.1em] text-[#718096] text-[10px] mb-4">Skill Verification Record</p>
                 <h3 className="text-3xl font-black text-[#2D3748] mb-3 leading-tight">Rao Noman</h3>
                 <span className="badge-clay-primary">Frontend Architecture</span>
              </div>

              <div className="flex items-end justify-between mb-8 pb-6 border-b border-[#D1D9E6] relative z-10">
                 <div>
                    <p className="text-[#718096] font-bold text-[10px] uppercase mb-1 tracking-wider">Final Score</p>
                    <div className="font-mono text-5xl font-black text-[#6C63FF] tracking-tighter" style={{ textShadow: "2px 2px 4px rgba(108, 99, 255, 0.2)" }}>94%</div>
                 </div>
                 <div className="text-right">
                    <p className="text-[#718096] font-bold text-[10px] uppercase mb-1 tracking-wider">Passed On</p>
                    <p className="font-mono text-sm text-[#4A5568] font-bold">Jan 24, 2026</p>
                 </div>
              </div>

              <div className="relative z-10">
                 <div className="flex justify-between text-[#718096] font-bold text-[10px] mb-3 uppercase tracking-wider">
                    <span>Required Score</span>
                    <span className="text-[#00C896]">Passed</span>
                 </div>
                 <div className="h-4 w-full bg-[#F5F8FA] rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.06),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] overflow-hidden p-1">
                    <div className="h-full bg-[#6C63FF] rounded-full w-[94%] shadow-[2px_2px_4px_rgba(108,99,255,0.4)]" />
                 </div>
              </div>
           </div>
        </div>
        
      </div>
    </section>
  )
}