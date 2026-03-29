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
      <div className="min-h-[100dvh] bg-[#EAEFF5] flex flex-col items-center justify-center p-6 text-center">
        <div className="clay-card max-w-xl w-full flex flex-col items-center bg-[#F5F8FA]">
          <div className="w-20 h-20 bg-[#F5F8FA] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.05),3px_3px_8px_#c8d0e7] text-[#FFB340] rounded-3xl flex items-center justify-center mb-8">
            <Hourglass size={36} className="drop-shadow-sm" />
          </div>
          <h2 className="text-3xl font-black text-[#2D3748] mb-4 drop-shadow-sm">Come Back Tomorrow</h2>
          <p className="text-[#718096] text-[15px] font-medium mb-8 leading-relaxed max-w-md mx-auto">
            You didn't pass the previous quiz. You can retake it after:
          </p>
          <div className="bg-[#EAEFF5] rounded-xl p-5 mb-10 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05),inset_-1px_-1px_3px_rgba(255,255,255,1)] inline-block">
             <p className="text-[#4A5568] font-mono text-sm tracking-wider font-bold">
               {retryAt.toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}
             </p>
          </div>
          <Link href={`/tracks/${id}`} className="clay-btn-secondary px-8 py-3.5 text-sm inline-flex items-center gap-2 font-bold">
            <ArrowLeft size={18} /> Back to Track
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
    <div className="min-h-[100dvh] bg-[#EAEFF5] py-12 px-4 sm:px-6 flex flex-col items-center justify-center">
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