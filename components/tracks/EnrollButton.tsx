'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

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

    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition mb-6 disabled:opacity-50 text-lg"
    >
      {loading ? 'Enrolling...' : '🚀 Enroll in this Track'}
    </button>
  )
}