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
        className="relative bg-[#F5F8FA] text-[#2D3748] border-none shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),4px_4px_12px_#c8d0e7,inset_0_0_0_1px_rgba(255,255,255,0.5)] p-12 flex flex-col justify-between overflow-hidden rounded-[2rem]"
        style={{ width: 800, minHeight: 560 }}
      >
        {/* Subtle Elegant Watermark */}
        <div className="absolute top-[-15%] right-[-10%] text-[#EAEFF5] transform rotate-12 pointer-events-none opacity-80 drop-shadow-sm">
          <ShieldCheck size={500} strokeWidth={0.5} />
        </div>

        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-[#D1D9E6] pb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#EAEFF5] flex items-center justify-center text-[#6C63FF] rounded-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,0.9),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7]">
              <Terminal size={24} strokeWidth={2.5} className="drop-shadow-sm" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter leading-none mb-1 text-[#2D3748] drop-shadow-sm">HORIZONX</h1>
              <p className="text-[#718096] font-mono text-[10px] uppercase tracking-[0.2em] font-black">Technical Verification</p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 text-[#00C896] bg-[#EAFBF5] px-3 py-1.5 border-none shadow-[inset_1px_1px_3px_rgba(0,200,150,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] text-[10px] font-mono uppercase font-black tracking-widest rounded-lg mb-2">
              <CheckCircle2 size={12} strokeWidth={3} /> Verified
            </div>
            <p className="text-[#A0AEC0] font-mono text-[10px] tracking-widest uppercase font-black">Official Record</p>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="flex-1 py-12 relative z-10 flex flex-col justify-center">
          <p className="text-[#A0AEC0] font-mono text-sm uppercase tracking-widest mb-4 font-black">This certifies that</p>
          <h2 className="text-5xl font-black text-[#2D3748] tracking-tight mb-8 drop-shadow-sm">
            {userName}
          </h2>
          
          <div className="space-y-3 mb-12">
            <p className="text-[#718096] text-lg font-medium">has successfully completed all assessment parameters for</p>
            <h3 className="text-3xl font-black text-[#2D3748] tracking-tight drop-shadow-sm">{fieldName}</h3>
            <div className="inline-flex">
              <p className="text-[#6C63FF] font-mono text-sm uppercase font-black tracking-widest border-l-[3px] border-[#6C63FF] pl-4 py-0.5">{trackName} Protocol</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-[#D1D9E6] pt-8">
            <div>
              <p className="text-[#A0AEC0] font-mono text-[10px] uppercase tracking-widest mb-1 font-black">Telemetry Score</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-black text-[#2D3748] font-mono leading-none tracking-tighter drop-shadow-sm">{score}</span>
                <span className="text-[#6C63FF] font-black font-mono text-xl">%</span>
              </div>
            </div>
            
            <div>
              <p className="text-[#A0AEC0] font-mono text-[10px] uppercase tracking-widest mb-1 font-black">Validation Date</p>
              <div className="text-2xl font-black text-[#2D3748] tracking-tight mt-1 drop-shadow-sm">{issueDate}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end relative z-10 border-t border-[#D1D9E6] pt-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#EAEFF5] p-2 rounded-lg shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05),1px_1px_2px_#c8d0e7]">
              <ShieldCheck size={28} className="text-[#A0AEC0] drop-shadow-sm" />
            </div>
            <div>
              <p className="text-[#2D3748] font-black text-[13px] tracking-wide drop-shadow-sm">HorizonX Validation Infrastructure</p>
              <p className="text-[#A0AEC0] font-mono text-[10px] tracking-widest font-black mt-1 uppercase">Electronically Issued</p>
            </div>
          </div>
          
          <div className="text-right">
             <Signature size={36} className="text-[#6C63FF] opacity-60 mb-2 ml-auto drop-shadow-sm" strokeWidth={2} />
             <p className="text-[#A0AEC0] font-mono text-[10px] tracking-[0.2em] font-black uppercase border-t border-[#D1D9E6] pt-2">Authorized Node</p>
          </div>
        </div>
      </div>
    )
  }
)

CertificateCard.displayName = 'CertificateCard'

export default CertificateCard
