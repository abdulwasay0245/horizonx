import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { TerminalSquare, BookOpen, ShieldCheck, Github, Linkedin, ArrowLeft, Target } from 'lucide-react'

export default async function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, name, bio, linkedin_url, github_url, is_public')
    .eq('id', id)
    .single()

  if (!profile) {
    return (
      <div className="min-h-[100dvh] bg-[#EAEFF5] flex flex-col items-center justify-center p-4">
        <div className="clay-card text-center max-w-sm w-full animate-fade-in-up">
          <div className="w-16 h-16 bg-[#EAEFF5] border-none shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7] rounded-2xl flex items-center justify-center mx-auto mb-8 text-[#A0AEC0]">
            <TerminalSquare size={32} className="drop-shadow-sm" />
          </div>
          <h2 className="text-2xl font-black text-[#2D3748] tracking-tight mb-3 drop-shadow-sm">Subject Not Found</h2>
          <p className="text-[#718096] text-[15px] mb-8 font-bold">This identity profile does not exist.</p>
          <Link href="/" className="clay-btn-secondary w-full text-sm py-3.5 font-bold">Return to Index</Link>
        </div>
      </div>
    )
  }

  if (!profile.is_public) {
    return (
      <div className="min-h-[100dvh] bg-[#EAEFF5] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="clay-card text-center max-w-sm w-full animate-fade-in-up">
          <div className="w-16 h-16 bg-[#FFF0F2] text-[#FF4D6A] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[inset_1px_1px_3px_rgba(255,100,100,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9),2px_2px_4px_#c8d0e7]">
            <ShieldCheck size={32} className="drop-shadow-sm" />
          </div>
          <h2 className="text-2xl font-black text-[#2D3748] tracking-tight mb-3 drop-shadow-sm">Encrypted Profile</h2>
          <p className="text-[#718096] text-[15px] mb-8 font-medium leading-relaxed">This subject has locked their telemetry metrics from public viewing.</p>
          <Link href="/" className="clay-btn-secondary w-full text-sm py-3.5 font-bold">Return to Index</Link>
        </div>
      </div>
    )
  }

  // Get certificates
  const { data: certificates } = await supabase
    .from('certificates')
    .select('*, tracks(*, fields(*))')
    .eq('user_id', id)
    .order('issued_at', { ascending: false })

  // Get enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, tracks(*, fields(*))')
    .eq('user_id', id)

  return (
    <div className="min-h-[100dvh] bg-[#EAEFF5] relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto py-16 px-6 relative z-10 animate-fade-in-up">
        {/* Profile header */}
        <div className="mb-16 pb-12 border-b border-[#D1D9E6]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="w-28 h-28 bg-[#F5F8FA] border-none flex items-center justify-center text-4xl text-[#6C63FF] font-black font-mono shadow-[inset_2px_2px_6px_rgba(255,255,255,0.9),inset_-2px_-2px_6px_rgba(0,0,0,0.05),4px_4px_10px_#c8d0e7] rounded-[2rem] shrink-0">
              <span className="drop-shadow-sm">{profile.name?.charAt(0)?.toUpperCase() || '?'}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                 <h1 className="text-4xl md:text-5xl font-black text-[#2D3748] tracking-tight drop-shadow-sm">{profile.name}</h1>
                 <span className="bg-[#F0EFFF] text-[#6C63FF] border-none shadow-[inset_1px_1px_3px_rgba(108,99,255,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] px-3 py-1 text-[11px] font-black uppercase tracking-widest rounded-lg inline-flex max-w-max">Verified Node</span>
              </div>
              
              {profile.bio && (
                <p className="text-[#718096] max-w-xl text-[15px] font-medium leading-relaxed mb-6">{profile.bio}</p>
              )}

              {/* Social links */}
              <div className="flex flex-wrap items-center gap-4">
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] font-black bg-[#EAEFF5] border-none shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05),inset_-1px_-1px_3px_rgba(255,255,255,1)] hover:shadow-[3px_3px_6px_#c8d0e7,inset_-1px_-1px_2px_rgba(255,255,255,0.8)] hover:bg-[#F5F8FA] text-[#718096] hover:text-[#6C63FF] transition-all px-5 py-3 rounded-xl"
                  >
                    <Linkedin size={18} /> LinkedIn Node
                  </a>
                )}
                {profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] font-black bg-[#EAEFF5] border-none shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05),inset_-1px_-1px_3px_rgba(255,255,255,1)] hover:shadow-[3px_3px_6px_#c8d0e7,inset_-1px_-1px_2px_rgba(255,255,255,0.8)] hover:bg-[#F5F8FA] text-[#718096] hover:text-[#6C63FF] transition-all px-5 py-3 rounded-xl"
                  >
                    <Github size={18} /> GitHub Node
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Audits */}
        {certificates && certificates.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-[#EAEFF5] rounded-xl flex items-center justify-center shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7]">
                  <TerminalSquare size={20} className="text-[#6C63FF] drop-shadow-sm" />
                </div>
                <h3 className="text-2xl font-black text-[#2D3748] tracking-tight drop-shadow-sm">Technical Execution Flow</h3>
            </div>
            <div className="space-y-6">
              {certificates.map((cert) => (
                <Link
                  key={cert.id}
                  href={`/certificate/${cert.id}`}
                  className="block group"
                >
                  <div className="clay-card flex flex-col sm:flex-row sm:items-center justify-between !p-6 hover:shadow-[4px_4px_12px_#c8d0e7,inset_-2px_-2px_4px_rgba(255,255,255,0.9)] transition-all">
                    <div className="mb-6 sm:mb-0">
                      <h4 className="text-[#2D3748] font-black tracking-tight text-xl mb-3 group-hover:text-[#6C63FF] transition-colors drop-shadow-sm">
                        {cert.tracks?.fields?.name || 'Unknown Protocol'}
                      </h4>
                      <div className="flex flex-wrap items-center gap-4">
                        <span className={`badge-${cert.tracks?.level?.toLowerCase() || 'beginner'} shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6)] px-3 py-1 font-bold`}>
                          {cert.tracks?.level} Spec
                        </span>
                        <span className="text-[#718096] bg-[#EAEFF5] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,1)] px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold tracking-widest">
                           {new Date(cert.issued_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-left sm:text-right pl-0 sm:pl-6 border-l-0 sm:border-l border-[#D1D9E6]">
                       <p className="text-[#A0AEC0] text-[10px] font-mono uppercase font-black tracking-widest mb-1">Telemetry Output</p>
                       <span className="text-[#00C896] font-black font-mono text-3xl drop-shadow-sm">{cert.score}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Enrolled tracks */}
        {enrollments && enrollments.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-[#EAEFF5] rounded-xl flex items-center justify-center shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7]">
                  <Target size={20} className="text-[#718096] drop-shadow-sm" />
                </div>
                <h3 className="text-2xl font-black text-[#2D3748] tracking-tight drop-shadow-sm">Active Engagements</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrollments.map((e) => (
                <div key={e.id} className="clay-card !p-6 flex items-start gap-5 hover:scale-[1.01] transition-transform">
                  <div className="w-12 h-12 bg-[#EAEFF5] rounded-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7] flex items-center justify-center text-[#A0AEC0] shrink-0">
                    <BookOpen size={20} className="drop-shadow-sm" />
                  </div>
                  <div>
                    <h4 className="text-[#2D3748] font-black tracking-tight mb-2 text-base drop-shadow-sm">
                      {e.tracks?.fields?.name || 'Unknown Vector'}
                    </h4>
                    <span className="text-[#718096] bg-[#EAEFF5] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,1)] px-2.5 py-1 rounded-md font-mono text-[10px] uppercase font-bold tracking-widest inline-block">
                       {e.tracks?.level} Spec
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="text-center mt-16 pt-10 border-t border-[#D1D9E6]">
          <Link href="/" className="inline-flex items-center justify-center gap-3 text-[#A0AEC0] hover:text-[#2D3748] text-[15px] font-black transition-colors bg-[#F5F8FA] px-6 py-3 rounded-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.02),2px_2px_5px_#c8d0e7]">
            <ArrowLeft size={18} /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
