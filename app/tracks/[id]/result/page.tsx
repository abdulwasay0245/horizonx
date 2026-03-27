import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/glass-card'

export default async function ResultPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ score: string; passed: string }>
}) {
  const { id } = await params
  const { score, passed } = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const isPassed = passed === 'true'
  const scoreNum = parseInt(score)

  const { data: certificate } = await supabase
    .from('certificates')
    .select('id')
    .eq('user_id', user.id)
    .eq('track_id', id)
    .order('issued_at', { ascending: false })
    .limit(1)
    .single()

  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none -z-10 transition-colors duration-1000 ${isPassed ? 'bg-amber-500/10 dark:bg-amber-500/5 text-amber-500' : 'bg-rose-500/10 dark:bg-rose-500/5 text-rose-500'}`} />
      
      <GlassCard className="max-w-xl w-full text-center !p-12 animate-fade-in-up" variant="glowing">
        {isPassed ? (
          <>
            <div className="w-28 h-28 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl flex items-center justify-center text-6xl mx-auto mb-8 shadow-xl shadow-amber-500/20 border-4 border-white dark:border-slate-800 animate-bounce-slow">
              🏆
            </div>
            <h2 className="text-4xl font-black text-foreground tracking-tight mb-4 leading-tight">You Passed! 🎉</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium text-lg leading-relaxed">
              Congratulations! You've proven your skills in this track.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8 mb-10 shadow-inner">
               <p className="text-amber-600/60 dark:text-amber-400/60 font-bold uppercase tracking-widest text-xs mb-2">Your Score</p>
               <div className="text-6xl md:text-7xl font-black text-amber-500 tracking-tighter">{scoreNum}%</div>
            </div>
            
            <div className="flex flex-col gap-4">
              {certificate && (
                <Link
                  href={`/certificate/${certificate.id}`}
                  className="glass-button w-full shadow-lg shadow-amber-500/20 !py-4 text-lg bg-amber-500 hover:bg-amber-600 border-amber-400 flex items-center justify-center gap-2 group"
                >
                  <span className="group-hover:scale-110 transition-transform">🎓</span> View My Badge
                </Link>
              )}
              <Link
                href="/tracks"
                className="glass-button-outline w-full !py-4 text-lg"
              >
                Browse All Tracks
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-24 h-24 bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-8 border border-rose-500/20 shadow-sm">
              😔
            </div>
            <h2 className="text-3xl font-black text-foreground tracking-tight mb-4">Not Quite — Try Again</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">You need at least 50% to pass. Review the material and try again.</p>
            
            <div className="bg-slate-100 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 mb-8">
               <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Your Score</p>
               <div className="text-5xl font-black text-rose-500 tracking-tighter">{scoreNum}%</div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 mb-8 flex items-center gap-4 text-left">
              <span className="text-2xl">⏳</span>
              <div>
                <p className="text-amber-700 dark:text-amber-400 font-bold text-sm tracking-tight">Mandatory Cooldown</p>
                <p className="text-amber-600/80 dark:text-amber-400/80 text-xs mt-1">You may retake this exam after 24 hours.</p>
              </div>
            </div>
            
            <Link
              href={`/tracks/${id}`}
              className="glass-button-outline w-full !py-4 text-lg flex items-center justify-center gap-2"
            >
              ← Back to Track
            </Link>
          </>
        )}
      </GlassCard>
    </div>
  )
}