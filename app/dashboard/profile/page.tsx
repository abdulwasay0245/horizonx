import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/profile/ProfileForm'

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
    <div className="max-w-2xl animate-fade-in-up py-8">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-[#2D3748] tracking-tight mb-2 drop-shadow-sm">My Profile</h2>
        <p className="text-[#718096] text-lg font-medium">Manage your personal information and visibility</p>
      </div>

      {/* Public profile link */}
      <div className="clay-card !p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F5F8FA]">
        <div>
          <p className="text-[#4A5568] text-sm font-bold mb-2 uppercase tracking-wide">Your public profile</p>
          <p className="text-[#6C63FF] text-sm break-all font-mono bg-[#EAEFF5] px-3 py-2 rounded-xl inline-block shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05)] font-bold">
            {process.env.NEXT_PUBLIC_APP_URL || ''}/profile/{user.id}
          </p>
        </div>
        <a
          href={`/profile/${user.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 clay-btn-secondary !py-2.5 !px-5 text-[13px] whitespace-nowrap"
        >
          View Live →
        </a>
      </div>

      <div className="clay-card !p-8 lg:!p-10 bg-[#F5F8FA]">
        <ProfileForm profile={profile} />
      </div>
    </div>
  )
}
