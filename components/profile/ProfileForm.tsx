'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface ProfileFormProps {
  profile: {
    id: string
    name: string
    bio: string | null
    linkedin_url: string | null
    github_url: string | null
    is_public: boolean
  }
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState(profile.name || '')
  const [bio, setBio] = useState(profile.bio || '')
  const [linkedinUrl, setLinkedinUrl] = useState(profile.linkedin_url || '')
  const [githubUrl, setGithubUrl] = useState(profile.github_url || '')
  const [isPublic, setIsPublic] = useState(profile.is_public || false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)

    await supabase
      .from('profiles')
      .update({
        name,
        bio: bio || null,
        linkedin_url: linkedinUrl || null,
        github_url: githubUrl || null,
        is_public: isPublic,
      })
      .eq('id', profile.id)

    setSaving(false)
    setSaved(true)
    router.refresh()
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Name */}
      <div>
        <label className="text-foreground text-sm font-semibold mb-2 block tracking-tight">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="glass-input w-full shadow-sm hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 transition-colors"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="text-foreground text-sm font-semibold mb-2 block tracking-tight">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          placeholder="Tell us about your technical journey..."
          className="glass-input w-full resize-none shadow-sm hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LinkedIn */}
        <div>
          <label className="text-foreground text-sm font-semibold mb-2 block tracking-tight">LinkedIn URL</label>
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/yourname"
            className="glass-input w-full shadow-sm hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 transition-colors"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="text-foreground text-sm font-semibold mb-2 block tracking-tight">GitHub URL</label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/yourname"
            className="glass-input w-full shadow-sm hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 transition-colors"
          />
        </div>
      </div>

      {/* Public toggle */}
      <div className="flex items-center justify-between bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl px-6 py-5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm mt-8">
        <div>
          <p className="text-foreground font-bold tracking-tight mb-1">Public Profile</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">Allow recruiters and others to see your profile, skills, and verified certificates.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsPublic(!isPublic)}
          className={`w-14 h-8 rounded-full transition-colors relative flex-shrink-0 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${
            isPublic ? 'bg-indigo-500 shadow-inner' : 'bg-slate-300 dark:bg-slate-600 shadow-inner'
          }`}
        >
          <span
            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-out ${
              isPublic ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Save button */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
        <button
          type="submit"
          disabled={saving}
          className="glass-button px-8 py-3"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {saved && (
          <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold flex items-center gap-2 animate-fade-in">
            <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">✓</span>
            Saved successfully
          </span>
        )}
      </div>
    </form>
  )
}
