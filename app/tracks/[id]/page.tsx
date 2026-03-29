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
      <Link href="/tracks" className="inline-flex items-center gap-2 text-sm font-bold text-[#718096] hover:text-[#6C63FF] transition-colors mb-8 bg-[#F5F8FA] px-4 py-2 rounded-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.02),2px_2px_4px_#c8d0e7]">
        <ArrowLeft size={16} /> All Tracks
      </Link>

      <div className="mb-12 border-b border-[#D1D9E6] pb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <h2 className="text-3xl md:text-4xl font-black text-[#2D3748] tracking-tight drop-shadow-sm">{track.fields?.name}</h2>
          <span className={`badge-clay-primary`}>
            {track.level}
          </span>
        </div>
        <p className="text-[#718096] text-lg leading-relaxed max-w-2xl font-medium">{track.description}</p>
      </div>

      {isEnrolled && (
        <div className="clay-card mb-10 overflow-hidden relative group">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-[#D1D9E6]">
            <div>
              <span className="text-[#2D3748] font-black text-lg tracking-tight block mb-2">Your Progress</span>
              <span className="text-[#718096] font-mono text-[10px] uppercase tracking-widest font-bold bg-[#F5F8FA] px-3 py-1.5 rounded-lg shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.02),1px_1px_3px_#c8d0e7]">
                {completedCount} / {totalCount} tasks completed
              </span>
            </div>
            <span className="text-5xl font-black font-mono text-[#6C63FF] tracking-tighter mt-4 sm:mt-0 drop-shadow-sm">
               {progress}%
            </span>
          </div>
          
          <div className="w-full bg-[#EAEFF5] rounded-full h-2 mb-8 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1),inset_-1px_-1px_3px_rgba(255,255,255,1)] overflow-hidden">
            <div
              className="bg-[#6C63FF] h-full rounded-full transition-all duration-1000 ease-out shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {allTasksDone && !testAttempt && (
            <Link
              href={`/tracks/${id}/test`}
              className="clay-btn-primary w-full flex justify-center items-center gap-3 py-4 text-[15px]"
            >
              <Target size={20} /> Take the Final Quiz
            </Link>
          )}

          {testAttempt && (
            <div className="mt-8 bg-[#EAEFF5] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),inset_-2px_-2px_5px_rgba(0,0,0,0.02),3px_3px_6px_#c8d0e7] rounded-2xl p-8 relative flex flex-col items-center">
              <div className="w-14 h-14 bg-[#F5F8FA] rounded-2xl flex items-center justify-center text-[#00C896] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.05),2px_2px_6px_#c8d0e7] mb-6">
                 <Award size={28} className="drop-shadow-sm" />
              </div>
              <p className="text-[#2D3748] font-black text-xl mb-2">Quiz Passed! 🎉</p>
              <p className="text-[#4A5568] text-[15px] mb-8 font-medium">Your Score: <span className="font-mono text-[#6C63FF] font-black bg-[#F5F8FA] px-2 py-1 rounded-lg ml-1 drop-shadow-sm">{testAttempt.score}%</span></p>
              <Link href="/dashboard/certificates" className="clay-btn-secondary px-8 py-3 text-[15px]">
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