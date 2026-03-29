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
        <label className="block text-xs font-bold text-[#4A5568] mb-2 uppercase tracking-wide">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
            className="clay-input w-full text-sm"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs font-bold text-[#4A5568] mb-2 uppercase tracking-wide">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          placeholder="Tell us about your technical journey..."
          className="clay-input w-full text-sm resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-bold text-[#4A5568] mb-2 uppercase tracking-wide">LinkedIn URL</label>
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/yourname"
              className="clay-input w-full text-sm"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-bold text-[#4A5568] mb-2 uppercase tracking-wide">GitHub URL</label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/yourname"
              className="clay-input w-full text-sm"
          />
        </div>
      </div>

      {/* Public toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#F5F8FA] rounded-3xl px-6 py-5 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),inset_-2px_-2px_5px_rgba(0,0,0,0.02),3px_3px_6px_#c8d0e7] mt-8 gap-4">
        <div>
          <p className="text-[#2D3748] font-black tracking-tight mb-1">Public Profile</p>
          <p className="text-[#718096] text-sm leading-relaxed max-w-sm font-medium">Allow recruiters and others to see your profile, skills, and verified certificates.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsPublic(!isPublic)}
          className={`w-14 h-8 rounded-full transition-all relative flex-shrink-0 focus:outline-none focus:ring-4 focus:ring-[#6C63FF]/30 ${
            isPublic ? 'bg-[#6C63FF] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)]' : 'bg-[#D1D9E6] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]'
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
      <div className="flex items-center gap-4 pt-6 border-t border-[#D1D9E6]">
        <button
          type="submit"
          disabled={saving}
          className="clay-btn-primary px-8 py-3.5"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {saved && (
          <span className="text-[#00C896] text-sm font-bold flex items-center gap-2 animate-fade-in bg-[#00C896]/10 px-3 py-1.5 rounded-xl">
            ✓ Saved successfully
          </span>
        )}
      </div>
    </form>
  )
}
