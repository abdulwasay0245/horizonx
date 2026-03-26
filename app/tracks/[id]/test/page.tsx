import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import TestClient from "@/components/test/TestClient"
import Link from 'next/link'
import { Hourglass, ArrowLeft } from 'lucide-react'

export default async function TestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Must be enrolled
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('track_id', id)
    .single()

  if (!enrollment) redirect(`/tracks/${id}`)

  // Must have completed all tasks
  const { data: tasks } = await supabase
    .from('tasks')
    .select('id')
    .eq('track_id', id)

  const taskIds = tasks?.map(t => t.id) || []

  const { data: submissions } = await supabase
    .from('submissions')
    .select('task_id')
    .eq('user_id', user.id)
    .in('task_id', taskIds.length > 0 ? taskIds : ['none'])

  if ((submissions?.length || 0) < taskIds.length) {
    redirect(`/tracks/${id}`)
  }

  // Check if already passed
  const { data: existingPass } = await supabase
    .from('test_attempts')
    .select('id, score')
    .eq('user_id', user.id)
    .eq('track_id', id)
    .eq('passed', true)
    .single()

  if (existingPass) redirect(`/tracks/${id}`)

  // Check retry cooldown
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { data: recentFail } = await supabase
    .from('test_attempts')
    .select('attempted_at')
    .eq('user_id', user.id)
    .eq('track_id', id)
    .eq('passed', false)
    .gte('attempted_at', yesterday)
    .order('attempted_at', { ascending: false })
    .limit(1)
    .single()

  if (recentFail) {
    const retryAt = new Date(new Date(recentFail.attempted_at).getTime() + 24 * 60 * 60 * 1000)
    return (
      <div className="min-h-[100dvh] bg-[#0A0A0F] flex flex-col items-center justify-center p-6 text-center">
        <div className="vercel-card max-w-xl w-full flex flex-col items-center">
          <div className="w-16 h-16 bg-[#FFB340]/10 border border-[#FFB340]/20 text-[#FFB340] rounded-xl flex items-center justify-center mb-6">
            <Hourglass size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#F0F0FF] mb-4">Mandatory Cooldown Period</h2>
          <p className="text-[#9090A8] text-sm mb-8 leading-relaxed max-w-md mx-auto">
            You did not pass the previous evaluation. To ensure adequate study time, you may re-initialize the test protocol after:
          </p>
          <div className="bg-[#1A1A24] border border-[#242430] rounded-xl p-4 mb-8 inline-block">
             <p className="text-[#F0F0FF] font-mono text-sm tracking-wider font-bold">
               {retryAt.toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}
             </p>
          </div>
          <Link href={`/tracks/${id}`} className="btn-secondary text-sm inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Return to Specification
          </Link>
        </div>
      </div>
    )
  }

  // Fetch 20 random questions
  const { data: questions } = await supabase
    .from('questions')
    .select('id, question, option_a, option_b, option_c, option_d')
    .eq('track_id', id)
    .limit(20)

  if (!questions || questions.length === 0) redirect(`/tracks/${id}`)

  const shuffled = [...(questions || [])].sort(() => Math.random() - 0.5)

  return (
    <div className="min-h-[100dvh] bg-[#0A0A0F] py-12 px-4 sm:px-6 flex flex-col items-center justify-center">
       <div className="w-full max-w-3xl mx-auto z-10 animate-fade-in-up">
         <TestClient
           questions={shuffled}
           trackId={id}
           userId={user.id}
         />
       </div>
    </div>
  )
}