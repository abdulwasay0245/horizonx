'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { UploadCloud } from 'lucide-react'

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
    <div className="vercel-card mt-8">
      <div className="flex justify-between items-start mb-6">
        <div>
           <h3 className="text-[#F0F0FF] font-black text-2xl tracking-tight mb-2 flex items-center gap-3">
             <UploadCloud size={24} className="text-[#6C63FF]" /> Deliver Work
           </h3>
           <p className="text-[#9090A8] text-sm leading-relaxed max-w-md">
             Input your public repository URI, deployed URL, Figma matrix, or specific documentation string.
           </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <textarea
            value={work}
            onChange={e => setWork(e.target.value)}
            placeholder="https://github.com/yourusername/project"
            rows={5}
            required
            className="vercel-input w-full resize-none font-mono text-sm leading-relaxed"
          />
          <div className="absolute top-4 right-4 text-[10px] font-mono text-[#5A5A70] uppercase tracking-widest hidden sm:block">
            Markdown Accepted
          </div>
        </div>
        
        {error && (
          <div className="bg-[#FF4D6A]/10 border border-[#FF4D6A]/20 text-[#FF4D6A] px-5 py-4 rounded-xl text-sm font-medium animate-fade-in shadow-sm">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading || !work.trim()}
          className="btn-primary w-full py-4 text-sm uppercase tracking-widest font-bold font-mono"
        >
          {loading ? 'Submitting payload...' : 'Confirm Execution'}
        </button>
      </form>
    </div>
  )
}