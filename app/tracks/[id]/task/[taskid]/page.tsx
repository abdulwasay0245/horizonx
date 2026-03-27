import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import TaskSubmitForm from '@/components/tracks/TaskSubmitForm'
import { GlassCard } from '@/components/ui/glass-card'
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
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
      >
        ← Back to Track
      </Link>

      <div className="mb-10">
        <div className="inline-block bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md mb-4 shadow-sm">
          Task {task.order_number}
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">{task.title}</h2>
      </div>

      <GlassCard className="!p-8 mb-8" variant="interactive">
        <div className="flex items-center gap-2 mb-4">
           <span className="text-xl">📋</span>
           <h3 className="text-foreground font-bold text-lg tracking-tight">Assignment Details</h3>
        </div>
        <div className="prose prose-slate dark:prose-invert prose-p:leading-relaxed prose-a:text-indigo-600 hover:prose-a:text-indigo-500 max-w-none text-slate-600 dark:text-slate-300">
          <p>{task.description}</p>
        </div>
      </GlassCard>

      {task.resources && (
        <GlassCard className="!p-8 mb-8" variant="interactive">
          <div className="flex items-center gap-2 mb-4">
             <span className="text-xl">🔗</span>
             <h3 className="text-foreground font-bold text-lg tracking-tight">Helpful Resources</h3>
          </div>
          <div className="flex flex-col gap-3">
            {task.resources.split(',').map((url: string, i: number) => (
              <a
                key={i}
                href={url.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-900/50 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-500/30 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </div>
                <span className="text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-sm font-medium truncate">
                  {url.trim()}
                </span>
              </a>
            ))}
          </div>
        </GlassCard>
      )}

      {isSubmitted ? (
        <GlassCard className="!p-8 text-center border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/5 shadow-emerald-500/5">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 border border-emerald-500/20 shadow-sm animate-fade-in">
             ✅
          </div>
          <h3 className="text-emerald-700 dark:text-emerald-400 font-black text-2xl tracking-tight mb-2">Task Submitted!</h3>
          <p className="text-emerald-600/80 dark:text-emerald-400/80 font-medium mb-8">Your work has been saved.</p>
          
          <div className="bg-white/50 dark:bg-slate-950/50 rounded-2xl p-6 text-left border border-slate-200/50 dark:border-slate-800/50 shadow-inner mb-8">
            <p className="text-slate-500 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Your Submission</p>
            <p className="text-slate-700 dark:text-slate-300 text-sm break-all font-mono bg-slate-100/50 dark:bg-slate-900/50 p-4 rounded-xl">
              {submission.submitted_work}
            </p>
          </div>
          
          <Link
            href={`/tracks/${id}`}
            className="glass-button-outline w-full inline-flex justify-center"
          >
            ← Check next task
          </Link>
        </GlassCard>
      ) : (
        <TaskSubmitForm
          taskId={taskid}
          trackId={id}
        />
      )}
    </div>
  )
}