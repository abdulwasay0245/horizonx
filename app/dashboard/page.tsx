import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import StatsCard from '@/components/dashboard/StatsCard'
import TrackCard from '@/components/dashboard/TrackCard'
import { BookOpen, Send, TerminalSquare as AwardIcon, Activity, Target, ArrowRight } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, tracks(*, fields(*))')
    .eq('user_id', user.id)

  const { count: submissionCount } = await supabase
    .from('submissions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const { data: certificates, count: certCount } = await supabase
    .from('certificates')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id)

  const avgScore = certificates && certificates.length > 0
    ? Math.round(certificates.reduce((sum, c) => sum + c.score, 0) / certificates.length)
    : 0

  const enrollmentsWithProgress = await Promise.all(
    (enrollments || []).map(async (enrollment) => {
      const { count: totalTasks } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .eq('track_id', enrollment.track_id)

      const { count: completedTasks } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .in('task_id', await supabase
          .from('tasks')
          .select('id')
          .eq('track_id', enrollment.track_id)
          .then(r => r.data?.map(t => t.id) || [])
        )

      const progress = totalTasks
        ? Math.round(((completedTasks || 0) / totalTasks) * 100)
        : 0

      return { ...enrollment, progress, totalTasks: totalTasks || 0, completedTasks: completedTasks || 0 }
    })
  )

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="mb-12 border-b border-[#242430] pb-8">
        <h2 className="text-3xl font-black text-[#F0F0FF] tracking-tight mb-2">
          Overview
        </h2>
        <p className="text-[#9090A8] text-sm">
          Welcome back, <span className="text-[#F0F0FF] font-semibold">{profile?.name?.split(' ')[0]}</span>. Your telemetry is below.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <StatsCard label="Tracks Enrolled" value={enrollments?.length || 0} icon={<BookOpen size={20} />} color="blue" />
        <StatsCard label="Tasks Submitted" value={submissionCount || 0} icon={<Send size={20} />} color="purple" />
        <StatsCard label="Verified Skills" value={certCount || 0} icon={<AwardIcon size={20} />} color="yellow" />
        <StatsCard label="Average Score" value={avgScore ? `${avgScore}%` : 'N/A'} icon={<Activity size={20} />} color="green" />
      </div>

      {/* Active Tracks */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-lg font-semibold text-[#F0F0FF] tracking-tight">Active Deployments</h3>
           <Link href="/tracks" className="text-sm font-semibold text-[#9090A8] hover:text-[#F0F0FF] transition-colors flex items-center gap-1">
              Browse all <ArrowRight size={14} />
           </Link>
        </div>
        
        {enrollmentsWithProgress.length === 0 ? (
          <div className="vercel-card text-center !py-16 border-dashed bg-transparent shadow-none flex flex-col items-center">
            <div className="w-12 h-12 bg-[#1A1A24] border border-[#242430] rounded-xl flex items-center justify-center mb-6 text-[#5A5A70]">
               <Target size={24} />
            </div>
            <h4 className="text-[#F0F0FF] font-semibold mb-2">No active tracks</h4>
            <p className="text-[#5A5A70] text-sm mb-6 max-w-sm mx-auto">
               Initialize your first track to begin executing technical workflows.
            </p>
            <Link href="/tracks" className="btn-secondary text-sm px-6 py-2">
              Browse Tracks
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollmentsWithProgress.map((e) => (
              <TrackCard
                key={e.id}
                id={e.track_id}
                field={e.tracks?.fields?.name || ''}
                level={e.tracks?.level || ''}
                progress={e.progress}
                totalTasks={e.totalTasks}
                completedTasks={e.completedTasks}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recent Certificates */}
      {certificates && certificates.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-semibold text-[#F0F0FF] tracking-tight">Verified Technical Audits</h3>
             <Link href="/dashboard/certificates" className="text-sm font-semibold text-[#9090A8] hover:text-[#F0F0FF] transition-colors flex items-center gap-1">
                View all <ArrowRight size={14} />
             </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.slice(0, 3).map((cert) => (
              <div key={cert.id} className="vercel-card group flex flex-col justify-between hover:border-[#6C63FF]/50">
                <div>
                  <div className="flex justify-between items-start mb-6 pb-6 border-b border-[#242430]">
                     <div className="w-10 h-10 bg-[#FFB340]/10 rounded-xl flex items-center justify-center text-[#FFB340] border border-[#FFB340]/20">
                       <AwardIcon size={20} />
                     </div>
                     <span className="text-[#6C63FF] font-black font-mono text-3xl tracking-tighter">{cert.score}%</span>
                  </div>
                  <h4 className="text-[#F0F0FF] font-semibold mb-1 truncate text-lg">
                     Telemetry Record
                  </h4>
                  <p className="text-[#5A5A70] font-mono uppercase text-[10px] tracking-[0.08em] font-bold mb-6">
                    Issued {new Date(cert.issued_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                  </p>
                </div>
                <Link
                  href={`/certificate/${cert.id}`}
                  className="w-full flex flex-col"
                >
                  <button className="btn-secondary w-full py-2 flex items-center justify-center gap-2 text-sm group-hover:border-[#6C63FF] group-hover:text-[#F0F0FF]">
                    Examine Record <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}