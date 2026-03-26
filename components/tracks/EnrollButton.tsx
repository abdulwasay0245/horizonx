'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Server } from 'lucide-react'

export default function EnrollButton({ trackId }: { trackId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleEnroll() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('enrollments').insert({
      user_id: user.id,
      track_id: trackId
    })

    // Send enrollment email (fire-and-forget)
    fetch('/api/email/enrollment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        name: user.user_metadata?.name || 'Candidate',
        trackName: 'authorized specification track',
      }),
    }).catch(() => {})

    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="btn-primary w-full py-4 mb-10 text-lg flex items-center justify-center gap-3 glow-primary"
    >
      <Server size={20} />
      {loading ? 'Initializing Environment...' : 'Deploy Track Instance'}
    </button>
  )
}