'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function TaskSubmitForm({
  taskId,
  trackId
}: {
  taskId: string
  trackId: string
}) {
  const [work, setWork] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!work.trim()) return

    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('submissions').insert({
      user_id: user.id,
      task_id: taskId,
      submitted_work: work.trim()
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.refresh()
    setLoading(false)
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <h3 className="text-white font-bold mb-2">📤 Submit Your Work</h3>
      <p className="text-gray-400 text-sm mb-4">
        Paste your GitHub repo link, hosted URL, or describe what you built.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={work}
          onChange={e => setWork(e.target.value)}
          placeholder="https://github.com/yourusername/project or describe your work..."
          rows={4}
          required
          className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
        />
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading || !work.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Task ✓'}
        </button>
      </form>
    </div>
  )
}