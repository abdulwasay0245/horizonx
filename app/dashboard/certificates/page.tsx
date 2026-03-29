import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TerminalSquare, ShieldCheck } from 'lucide-react'

export default async function CertificatesPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: certificates } = await supabase
    .from('certificates')
    .select('*, tracks(*, fields(*))')
    .eq('user_id', user.id)
    .order('issued_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-12 border-b border-[#D1D9E6] pb-8">
        <h2 className="text-3xl font-black text-[#2D3748] tracking-tight mb-2 drop-shadow-sm">Verification Matrix</h2>
        <p className="text-[#718096] text-sm font-medium">Review generated technical reports and valid architectural skills.</p>
      </div>

      {certificates && certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="clay-card-interactive flex flex-col group transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-[#F5F8FA] rounded-2xl flex items-center justify-center text-[#6C63FF] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.05),2px_2px_6px_#c8d0e7] relative overflow-hidden">
                  <ShieldCheck size={28} className="relative z-10 drop-shadow-sm" />
                </div>
              </div>
              
              <div>
                <h4 className="text-[#2D3748] text-lg font-black tracking-tight mb-3 line-clamp-1">
                  {cert.tracks?.fields?.name || 'Unknown Track'}
                </h4>
                <div className="flex flex-col gap-3 mb-6">
                  <span className={`badge-[clay-primary] self-start`}>
                    {cert.tracks?.level || ''} Spec
                  </span>
                  <span className="text-[#718096] font-mono text-[10px] uppercase font-bold tracking-widest">
                    {new Date(cert.issued_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-[#D1D9E6] flex items-end justify-between">
                <div>
                  <p className="text-[#718096] font-mono text-[10px] uppercase tracking-widest font-bold mb-1">Execution Metric</p>
                  <span className="text-[#6C63FF] font-black font-mono text-4xl tracking-tighter drop-shadow-sm">{cert.score}%</span>
                </div>
                <Link
                  href={`/certificate/${cert.id}`}
                  className="clay-btn-secondary px-5 py-2.5 text-sm"
                >
                  Examine
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="clay-card text-center !py-16 !shadow-none border-dashed !border-[#D1D9E6] bg-transparent flex flex-col items-center">
          <div className="w-16 h-16 bg-[#F5F8FA] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),inset_-2px_-2px_5px_rgba(0,0,0,0.02),3px_3px_6px_#c8d0e7] rounded-3xl flex items-center justify-center mb-6 text-[#718096]">
             <TerminalSquare size={28} />
          </div>
          <h4 className="text-[#2D3748] font-black mb-2 text-xl">No technical skills verified</h4>
          <p className="text-[#718096] text-sm mb-8 max-w-md mx-auto font-medium">
            Complete an engineering curriculum and pass the final evaluation matrix to log unforgeable records.
          </p>
          <Link
            href="/tracks"
            className="clay-btn-primary px-8 py-3.5 text-sm"
          >
            Review Curriculums
          </Link>
        </div>
      )}
    </div>
  )
}
