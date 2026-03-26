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
      <div className="min-h-[100dvh] bg-[#0A0A0F] flex flex-col items-center justify-center p-4">
        <div className="vercel-card text-center max-w-sm w-full animate-fade-in-up">
          <div className="w-12 h-12 bg-[#1A1A24] border border-[#242430] rounded-xl flex items-center justify-center mx-auto mb-6 text-[#5A5A70]">
            <TerminalSquare size={24} />
          </div>
          <h2 className="text-xl font-bold text-[#F0F0FF] tracking-tight mb-2">Subject Not Found</h2>
          <p className="text-[#9090A8] text-sm mb-6 font-medium">This identity profile does not exist.</p>
          <Link href="/" className="btn-secondary w-full text-sm">Return to Index</Link>
        </div>
      </div>
    )
  }

  if (!profile.is_public) {
    return (
      <div className="min-h-[100dvh] bg-[#0A0A0F] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="vercel-card text-center max-w-sm w-full animate-fade-in-up">
          <div className="w-12 h-12 bg-[#FF4D6A]/10 text-[#FF4D6A] rounded-xl flex items-center justify-center mx-auto mb-6 border border-[#FF4D6A]/20">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-xl font-bold text-[#F0F0FF] tracking-tight mb-2">Encrypted Profile</h2>
          <p className="text-[#9090A8] text-sm mb-6 leading-relaxed">This subject has locked their telemetry metrics from public viewing.</p>
          <Link href="/" className="btn-secondary w-full text-sm">Return to Index</Link>
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
    <div className="min-h-[100dvh] bg-[#0A0A0F] relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto py-16 px-6 relative z-10 animate-fade-in-up">
        {/* Profile header */}
        <div className="mb-16 pb-12 border-b border-[#242430]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="w-24 h-24 bg-[#111118] border border-[#242430] flex items-center justify-center text-3xl text-[#6C63FF] font-black font-mono shadow-sm shrink-0">
              {profile.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                 <h1 className="text-3xl md:text-4xl font-black text-[#F0F0FF] tracking-tight">{profile.name}</h1>
                 <span className="bg-[#6C63FF]/10 text-[#6C63FF] border border-[#6C63FF]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm">Verified Node</span>
              </div>
              
              {profile.bio && (
                <p className="text-[#9090A8] max-w-xl text-base leading-relaxed mb-6">{profile.bio}</p>
              )}

              {/* Social links */}
              <div className="flex items-center gap-3">
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold bg-[#111118] border border-[#242430] hover:border-[#F0F0FF]/20 text-[#9090A8] hover:text-[#F0F0FF] transition-all px-4 py-2 rounded-md"
                  >
                    <Linkedin size={14} /> LinkedIn Node
                  </a>
                )}
                {profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold bg-[#111118] border border-[#242430] hover:border-[#F0F0FF]/20 text-[#9090A8] hover:text-[#F0F0FF] transition-all px-4 py-2 rounded-md"
                  >
                    <Github size={14} /> GitHub Node
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Audits */}
        {certificates && certificates.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
                <TerminalSquare size={20} className="text-[#6C63FF]" />
                <h3 className="text-xl font-bold text-[#F0F0FF] tracking-tight">Technical Execution Flow</h3>
            </div>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <Link
                  key={cert.id}
                  href={`/certificate/${cert.id}`}
                  className="block group"
                >
                  <div className="vercel-card flex flex-col sm:flex-row sm:items-center justify-between !p-5 group-hover:border-[#6C63FF]/50 transition-colors">
                    <div className="mb-4 sm:mb-0">
                      <h4 className="text-[#F0F0FF] font-bold tracking-tight text-lg mb-1 group-hover:text-[#6C63FF] transition-colors">
                        {cert.tracks?.fields?.name || 'Unknown Protocol'}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className={`badge-${cert.tracks?.level?.toLowerCase() || 'beginner'}`}>
                          {cert.tracks?.level} Spec
                        </span>
                        <span className="text-[#5A5A70] font-mono text-[10px] uppercase font-bold tracking-widest">
                           {new Date(cert.issued_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-left sm:text-right pl-0 sm:pl-4 border-l-0 sm:border-l border-[#242430]">
                       <p className="text-[#5A5A70] text-[10px] font-mono uppercase font-bold tracking-widest mb-1">Telemetry Output</p>
                       <span className="text-[#00C896] font-black font-mono text-2xl">{cert.score}%</span>
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
            <div className="flex items-center gap-3 mb-6">
                <Target size={20} className="text-[#5A5A70]" />
                <h3 className="text-xl font-bold text-[#F0F0FF] tracking-tight">Active Engagements</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrollments.map((e) => (
                <div key={e.id} className="vercel-card !p-5 flex items-start gap-4 hover:border-[#242430]">
                  <div className="w-10 h-10 bg-[#1A1A24] border border-[#242430] flex items-center justify-center text-[#5A5A70] shrink-0">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h4 className="text-[#F0F0FF] font-bold tracking-tight mb-1 text-sm">
                      {e.tracks?.fields?.name || 'Unknown Vector'}
                    </h4>
                    <span className="text-[#5A5A70] font-mono text-[10px] uppercase font-bold tracking-widest">
                       {e.tracks?.level} Spec
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="text-center mt-16 pt-8 border-t border-[#242430]">
          <Link href="/" className="inline-flex items-center justify-center gap-2 text-[#5A5A70] hover:text-[#F0F0FF] text-sm font-semibold transition-colors">
            <ArrowLeft size={16} /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
