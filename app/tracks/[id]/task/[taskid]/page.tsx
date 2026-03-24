import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import TaskSubmitForm from '@/components/tracks/TaskSubmitForm'

export default async function TaskPage({
  params
}: {
  params: { id: string; taskId: string }
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Check enrollment
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('track_id', params.id)
    .single()

  if (!enrollment) redirect(`/tracks/${params.id}`)

  // Get task
  const { data: task } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', params.taskId)
    .single()

  if (!task) redirect(`/tracks/${params.id}`)

  // Check if already submitted
  const { data: submission } = await supabase
    .from('submissions')
    .select('id, submitted_work')
    .eq('user_id', user.id)
    .eq('task_id', params.taskId)
    .single()

  const isSubmitted = !!submission

  return (
    <div className="max-w-2xl">
      {/* Back Link */}
      <a
        href={`/tracks/${params.id}`}
        className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-6 transition"
      >
        ← Back to Track
      </a>

      {/* Task Header */}
      <div className="mb-8">
        <div className="text-blue-500 text-sm font-bold mb-2">Task {task.order_number}</div>
        <h2 className="text-3xl font-black text-white mb-3">{task.title}</h2>
      </div>

      {/* Task Description */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
        <h3 className="text-white font-bold mb-3">📋 Description</h3>
        <p className="text-gray-300 leading-relaxed">{task.description}</p>
      </div>

      {/* Resources */}
      {task.resources && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h3 className="text-white font-bold mb-3">🔗 Helpful Resources</h3>
          <div className="space-y-2">
            {task.resources.split(',').map((url: string, i: number) => (
              <a
                key={i}
                href={url.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-400 hover:text-blue-300 text-sm transition truncate"
              >
                {url.trim()}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Submission */}
      {isSubmitted ? (
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-3">✅</div>
          <h3 className="text-green-400 font-bold text-lg mb-2">Task Submitted!</h3>
          <p className="text-gray-400 text-sm mb-4">Your work has been submitted successfully.</p>
          <div className="bg-gray-900 rounded-xl p-4 text-left">
            <p className="text-gray-400 text-xs font-medium mb-1">Your submission:</p>
            <p className="text-white text-sm break-all">{submission.submitted_work}</p>
          </div>
          <a
            href={`/tracks/${params.id}`}
            className="mt-4 inline-block text-blue-400 hover:text-blue-300 text-sm font-medium transition"
          >
            ← Back to Track
          </a>
        </div>
      ) : (
        <TaskSubmitForm
          taskId={params.taskId}
          trackId={params.id}
        />
      )}
    </div>
  )
}