import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EnrollButton from '@/components/tracks/EnrollButton'
import TaskList from '@/components/tracks/TaskList'

export default async function TrackDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: track } = await supabase
    .from('tracks')
    .select('*, fields(*)')
    .eq('id', params.id)
    .single()

  if (!track) redirect('/tracks')

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('track_id', params.id)
    .order('order_number', { ascending: true })

  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('track_id', params.id)
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
    .eq('track_id', params.id)
    .eq('passed', true)
    .single()

  const levelColor: Record<string, string> = {
    beginner: 'bg-green-500/20 text-green-400',
    intermediate: 'bg-yellow-500/20 text-yellow-400',
    advanced: 'bg-red-500/20 text-red-400',
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-3xl font-black text-white">{track.fields?.name}</h2>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${levelColor[track.level]}`}>
            {track.level}
          </span>
        </div>
        <p className="text-gray-400">{track.description}</p>
      </div>

      {isEnrolled && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-bold">Your Progress</span>
            <span className="text-blue-400 font-black">{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm">{completedCount} of {totalCount} tasks completed</p>

          {allTasksDone && !testAttempt && (
            <a
              href={`/tracks/${params.id}/test`}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition text-center block"
            >
              🎯 Take the Final Test
            </a>
          )}

          {testAttempt && (
            <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
              <p className="text-yellow-400 font-bold">✅ Test Passed — Score: {testAttempt.score}%</p>
              <a href="/dashboard/certificates" className="text-blue-400 text-sm hover:underline">
                View Certificate →
              </a>
            </div>
          )}
        </div>
      )}

      {!isEnrolled && (
        <EnrollButton trackId={params.id} />
      )}

      <TaskList
        tasks={tasks || []}
        completedTaskIds={completedTaskIds}
        isEnrolled={isEnrolled}
        trackId={params.id}
      />
    </div>
  )
}