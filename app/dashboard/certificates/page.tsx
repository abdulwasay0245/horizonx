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
      <div className="mb-12 border-b border-[#242430] pb-8">
        <h2 className="text-3xl font-black text-[#F0F0FF] tracking-tight mb-2">Verification Matrix</h2>
        <p className="text-[#9090A8] text-sm">Review generated technical reports and valid architectural skills.</p>
      </div>

      {certificates && certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="vercel-card flex flex-col group hover:border-[#6C63FF]/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-[#6C63FF]/10 rounded-xl flex items-center justify-center text-[#6C63FF] border border-[#6C63FF]/20 relative overflow-hidden">
                  <ShieldCheck size={24} className="relative z-10" />
                </div>
              </div>
              
              <div>
                <h4 className="text-[#F0F0FF] text-lg font-semibold tracking-tight mb-3 line-clamp-1">
                  {cert.tracks?.fields?.name || 'Unknown Track'}
                </h4>
                <div className="flex flex-col gap-3 mb-6">
                  <span className={`badge-${cert.tracks?.level?.toLowerCase() || 'beginner'} self-start`}>
                    {cert.tracks?.level || ''} Spec
                  </span>
                  <span className="text-[#5A5A70] font-mono text-[10px] uppercase font-bold tracking-widest">
                    {new Date(cert.issued_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-[#242430] flex items-end justify-between">
                <div>
                  <p className="text-[#5A5A70] font-mono text-[10px] uppercase tracking-widest font-bold mb-1">Execution Metric</p>
                  <span className="text-[#F0F0FF] font-black font-mono text-3xl tracking-tighter">{cert.score}%</span>
                </div>
                <Link
                  href={`/certificate/${cert.id}`}
                  className="btn-secondary px-4 py-2 text-sm text-[#F0F0FF]"
                >
                  Examine
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="vercel-card text-center !py-16 border-dashed bg-transparent shadow-none flex flex-col items-center">
          <div className="w-12 h-12 bg-[#1A1A24] border border-[#242430] rounded-xl flex items-center justify-center mb-6 text-[#5A5A70]">
             <TerminalSquare size={24} />
          </div>
          <h4 className="text-[#F0F0FF] font-semibold mb-2">No technical skills verified</h4>
          <p className="text-[#5A5A70] text-sm mb-6 max-w-sm mx-auto">
            Complete an engineering curriculum and pass the final evaluation matrix to log unforgeable records.
          </p>
          <Link
            href="/tracks"
            className="btn-secondary px-6 py-2 text-sm text-[#F0F0FF]"
          >
            Review Curriculums
          </Link>
        </div>
      )}
    </div>
  )
}
