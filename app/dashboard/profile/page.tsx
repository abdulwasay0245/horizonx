import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/profile/ProfileForm'
import { GlassCard } from '@/components/ui/glass-card'

export default async function ProfileSettingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, name, bio, linkedin_url, github_url, is_public')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/dashboard')

  return (
    <div className="max-w-2xl animate-fade-in-up">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-foreground tracking-tight mb-2">My Profile</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Manage your personal information and visibility</p>
      </div>

      {/* Public profile link */}
      <GlassCard className="!p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/20" variant="glowing">
        <div>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold mb-1">Your public profile</p>
          <p className="text-indigo-600 dark:text-indigo-400 text-sm break-all font-mono bg-white/50 dark:bg-slate-900/50 px-2 py-1 rounded inline-block border border-slate-200 dark:border-slate-800">
            {process.env.NEXT_PUBLIC_APP_URL || ''}/profile/{user.id}
          </p>
        </div>
        <a
          href={`/profile/${user.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 glass-button-outline !py-2 !px-4 text-sm"
        >
          View Live →
        </a>
      </GlassCard>

      <GlassCard className="!p-8 lg:!p-10">
        <ProfileForm profile={profile} />
      </GlassCard>
    </div>
  )
}
