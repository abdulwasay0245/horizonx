'use client'

import { forwardRef } from 'react'
import { Terminal, CheckCircle2, ShieldCheck, Signature } from 'lucide-react'

interface CertificateCardProps {
  userName: string
  trackName: string
  fieldName: string
  score: number
  issuedAt: string
}

const CertificateCard = forwardRef<HTMLDivElement, CertificateCardProps>(
  ({ userName, trackName, fieldName, score, issuedAt }, ref) => {
    const issueDate = new Date(issuedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    return (
      <div
        ref={ref}
        className="relative bg-[#0A0A0F] text-[#F0F0FF] border border-[#242430] p-12 flex flex-col justify-between overflow-hidden"
        style={{ width: 800, minHeight: 560 }}
      >
        {/* Subtle Elegant Watermark */}
        <div className="absolute top-[-15%] right-[-10%] text-[#1A1A24] transform rotate-12 pointer-events-none opacity-50">
          <ShieldCheck size={500} strokeWidth={0.5} />
        </div>

        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-[#242430] pb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#F0F0FF] flex items-center justify-center text-[#0A0A0F] rounded-sm shadow-[0_0_15px_rgba(240,240,255,0.05)]">
              <Terminal size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter leading-none mb-1 text-[#F0F0FF]">HORIZONX</h1>
              <p className="text-[#9090A8] font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">Technical Verification</p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 text-[#00C896] bg-[#00C896]/10 px-2 py-1 border border-[#00C896]/20 text-[10px] font-mono uppercase font-bold tracking-widest rounded-sm mb-2">
              <CheckCircle2 size={12} strokeWidth={2.5} /> Verified
            </div>
            <p className="text-[#5A5A70] font-mono text-[10px] tracking-widest uppercase">Official Record</p>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="flex-1 py-12 relative z-10 flex flex-col justify-center">
          <p className="text-[#5A5A70] font-mono text-sm uppercase tracking-widest mb-4 font-bold">This certifies that</p>
          <h2 className="text-5xl font-black text-[#F0F0FF] tracking-tight mb-8">
            {userName}
          </h2>
          
          <div className="space-y-3 mb-12">
            <p className="text-[#9090A8] text-lg">has successfully completed all assessment parameters for</p>
            <h3 className="text-3xl font-bold text-[#F0F0FF] tracking-tight">{fieldName}</h3>
            <div className="inline-flex">
              <p className="text-[#6C63FF] font-mono text-sm uppercase tracking-widest border-l-2 border-[#6C63FF] pl-3 py-0.5">{trackName} Protocol</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-[#242430] pt-8">
            <div>
              <p className="text-[#5A5A70] font-mono text-[10px] uppercase tracking-widest mb-1 font-bold">Telemetry Score</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-black text-[#F0F0FF] font-mono leading-none tracking-tighter">{score}</span>
                <span className="text-[#6C63FF] font-bold font-mono">%</span>
              </div>
            </div>
            
            <div>
              <p className="text-[#5A5A70] font-mono text-[10px] uppercase tracking-widest mb-1 font-bold">Validation Date</p>
              <div className="text-2xl font-bold text-[#F0F0FF] tracking-tight mt-1">{issueDate}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end relative z-10 border-t border-[#242430] pt-6">
          <div className="flex items-center gap-3">
            <ShieldCheck size={24} className="text-[#5A5A70]" />
            <div>
              <p className="text-[#F0F0FF] font-semibold text-xs tracking-wide">HorizonX Validation Infrastructure</p>
              <p className="text-[#5A5A70] font-mono text-[10px] tracking-widest mt-0.5 uppercase">Electronically Issued</p>
            </div>
          </div>
          
          <div className="text-right">
             <Signature size={32} className="text-[#6C63FF] opacity-50 mb-2 ml-auto" strokeWidth={1.5} />
             <p className="text-[#5A5A70] font-mono text-[10px] tracking-[0.2em] uppercase border-t border-[#242430] pt-1">Authorized Node</p>
          </div>
        </div>
      </div>
    )
  }
)

CertificateCard.displayName = 'CertificateCard'

export default CertificateCard
