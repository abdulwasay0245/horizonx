import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EnrollButton from '@/components/tracks/EnrollButton'
import TaskList from '@/components/tracks/TaskList'
import Link from 'next/link'
import { Award, Target, ArrowLeft } from 'lucide-react'

export default async function TrackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: track } = await supabase
    .from('tracks')
    .select('*, fields(*)')
    .eq('id', id)
    .single()

  if (!track) redirect('/tracks')

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('track_id', id)
    .order('order_number', { ascending: true })

  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('track_id', id)
    .single()

  const isEnrolled = !!enrollment
  const taskIds = tasks?.map(t => t.id) || []

  const { data: submissions } = await supabase
    .from('submissions')
    .select('task_id')
    .eq('user_id', user.id)
    .in('task_id', taskIds.length > 0 ? taskIds : ['none'])

  const completedTaskIds = submissions?.map(s => s.task_id) || []
  const completedCount = completedTaskIds.length
  const totalCount = tasks?.length || 0
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  const allTasksDone = completedCount === totalCount && totalCount > 0

  const { data: testAttempt } = await supabase
    .from('test_attempts')
    .select('id, passed, score')
    .eq('user_id', user.id)
    .eq('track_id', id)
    .eq('passed', true)
    .single()

  return (
    <div className="max-w-4xl mx-auto py-8 lg:py-12 px-6">
      <Link href="/tracks" className="inline-flex items-center gap-2 text-sm font-semibold text-[#9090A8] hover:text-[#F0F0FF] transition-colors mb-8">
        <ArrowLeft size={16} /> All Tracks
      </Link>

      <div className="mb-12 border-b border-[#242430] pb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <h2 className="text-3xl md:text-4xl font-black text-[#F0F0FF] tracking-tight">{track.fields?.name}</h2>
          <span className={`badge-${track.level.toLowerCase()}`}>
            {track.level}
          </span>
        </div>
        <p className="text-[#9090A8] text-lg leading-relaxed max-w-2xl">{track.description}</p>
      </div>

      {isEnrolled && (
        <div className="vercel-card mb-10 overflow-hidden relative group border-[#6C63FF]/20 shadow-[0_0_15px_rgba(108,99,255,0.05)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-[#242430]">
            <div>
              <span className="text-[#F0F0FF] font-semibold text-lg tracking-tight block mb-1">Your Progress</span>
              <span className="text-[#5A5A70] font-mono text-[10px] uppercase tracking-widest font-bold">
                {completedCount} / {totalCount} tasks completed
              </span>
            </div>
            <span className="text-5xl font-black font-mono text-[#6C63FF] tracking-tighter mt-4 sm:mt-0">
               {progress}%
            </span>
          </div>
          
          <div className="w-full bg-[#1A1A24] rounded-full h-1.5 mb-8 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {allTasksDone && !testAttempt && (
            <Link
              href={`/tracks/${id}/test`}
              className="btn-primary w-full flex justify-center items-center gap-2 glow-primary"
            >
              <Target size={18} /> Take the Final Quiz
            </Link>
          )}

          {testAttempt && (
            <div className="mt-8 bg-[#00C896]/5 border border-[#00C896]/20 rounded-xl p-6 relative flex flex-col items-center">
              <div className="w-12 h-12 bg-[#00C896]/10 rounded-full flex items-center justify-center text-[#00C896] shadow-sm mb-4">
                 <Award size={24} />
              </div>
              <p className="text-[#00C896] font-semibold text-lg mb-1">Quiz Passed! 🎉</p>
              <p className="text-[#9090A8] text-sm mb-6">Your Score: <span className="font-mono text-[#F0F0FF] font-bold">{testAttempt.score}%</span></p>
              <Link href="/dashboard/certificates" className="btn-secondary px-6 py-2 text-sm text-[#F0F0FF]">
                View My Badge
              </Link>
            </div>
          )}
        </div>
      )}

      {!isEnrolled && (
        <EnrollButton trackId={id} />
      )}

      <TaskList
        tasks={tasks || []}
        completedTaskIds={completedTaskIds}
        isEnrolled={isEnrolled}
        trackId={id}
      />
    </div>
  )
}