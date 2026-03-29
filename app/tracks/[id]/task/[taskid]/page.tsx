import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import TaskSubmitForm from '@/components/tracks/TaskSubmitForm'
import Link from 'next/link'

export default async function TaskPage({
  params
}: {
  params: Promise<{ id: string; taskid: string }>
}) {
  const { id, taskid } = await params

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('track_id', id)
    .single()

  if (!enrollment) redirect(`/tracks/${id}`)

  const { data: task } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', taskid)
    .single()

  if (!task) redirect(`/tracks/${id}`)

  const { data: submission } = await supabase
    .from('submissions')
    .select('id, submitted_work')
    .eq('user_id', user.id)
    .eq('task_id', taskid)
    .single()

  const isSubmitted = !!submission

  return (
    <div className="max-w-3xl mx-auto py-8 lg:py-12 animate-fade-in-up">
      <Link
        href={`/tracks/${id}`}
        className="inline-flex items-center gap-2 text-sm font-bold text-[#718096] hover:text-[#6C63FF] transition-colors mb-8 bg-[#F5F8FA] px-4 py-2 rounded-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.02),2px_2px_4px_#c8d0e7]"
      >
        ← Back to Track
      </Link>

      <div className="mb-10">
        <div className="inline-block bg-[#F5F8FA] text-[#6C63FF] text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg mb-4 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.03),1px_1px_3px_#c8d0e7]">
          Task {task.order_number}
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-[#2D3748] tracking-tight leading-tight drop-shadow-sm">{task.title}</h2>
      </div>

      <div className="clay-card !p-8 mb-8">
        <div className="flex items-center gap-2 mb-4">
           <span className="text-xl drop-shadow-sm">📋</span>
           <h3 className="text-[#2D3748] font-black text-xl tracking-tight">Assignment Details</h3>
        </div>
        <div className="prose prose-slate prose-p:leading-relaxed prose-a:text-[#6C63FF] hover:prose-a:text-[#7D75FF] max-w-none text-[#4A5568] font-medium">
          <p>{task.description}</p>
        </div>
      </div>

      {task.resources && (
        <div className="clay-card !p-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
             <span className="text-xl drop-shadow-sm">🔗</span>
             <h3 className="text-[#2D3748] font-black text-xl tracking-tight">Helpful Resources</h3>
          </div>
          <div className="flex flex-col gap-3">
            {task.resources.split(',').map((url: string, i: number) => (
              <a
                key={i}
                href={url.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 bg-[#EAEFF5] rounded-xl hover:bg-[#F5F8FA] transition-all shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05),inset_-1px_-1px_3px_rgba(255,255,255,1)] hover:shadow-[2px_2px_6px_#c8d0e7,inset_-1px_-1px_2px_rgba(255,255,255,0.8)]"
              >
                <div className="w-8 h-8 rounded-xl bg-[#F5F8FA] flex items-center justify-center text-[#6C63FF] transition-colors shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </div>
                <span className="text-[#4A5568] group-hover:text-[#6C63FF] text-[15px] font-bold truncate transition-colors">
                  {url.trim()}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {isSubmitted ? (
        <div className="clay-card !p-8 text-center">
          <div className="w-20 h-20 bg-[#F5F8FA] rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.05),3px_3px_8px_#c8d0e7] animate-fade-in">
             <span className="drop-shadow-sm">✅</span>
          </div>
          <h3 className="text-[#00C896] font-black text-2xl tracking-tight mb-2 drop-shadow-sm">Task Submitted!</h3>
          <p className="text-[#4A5568] font-medium mb-8">Your work has been saved.</p>
          
          <div className="bg-[#EAEFF5] rounded-2xl p-6 text-left shadow-[inset_2px_2px_5px_rgba(0,0,0,0.06),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] mb-8">
            <p className="text-[#718096] text-xs font-bold uppercase tracking-wider mb-2">Your Submission</p>
            <p className="text-[#2D3748] text-sm break-all font-mono bg-[#F5F8FA] p-4 rounded-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),1px_1px_2px_rgba(0,0,0,0.05)] font-bold">
              {submission.submitted_work}
            </p>
          </div>
          
          <Link
            href={`/tracks/${id}`}
            className="clay-btn-secondary w-full inline-flex justify-center py-3.5"
          >
            ← Check next task
          </Link>
        </div>
      ) : (
        <TaskSubmitForm
          taskId={taskid}
          trackId={id}
        />
      )}
    </div>
  )
}