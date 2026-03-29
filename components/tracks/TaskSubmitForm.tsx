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
    <div className="clay-card mt-8">
      <div className="flex justify-between items-start mb-6">
        <div>
           <h3 className="text-[#2D3748] font-black text-2xl tracking-tight mb-2 flex items-center gap-3 drop-shadow-sm">
             <UploadCloud size={28} className="text-[#6C63FF] drop-shadow-sm" /> Submit Your Work
           </h3>
           <p className="text-[#718096] text-[15px] font-medium leading-relaxed max-w-md">
             Paste your GitHub link, live URL, Figma link, or write your answer below.
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
            className="w-full bg-[#EAEFF5] border-none text-[#2D3748] rounded-2xl px-5 py-4 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] focus:ring-4 focus:ring-[#6C63FF]/30 outline-none transition-all placeholder:text-[#A0AEC0] font-mono font-medium resize-none leading-relaxed text-sm"
          />
        </div>
        
        {error && (
          <div className="bg-[#FFF0F2] border border-[#FFCCD4] text-[#FF4D6A] px-5 py-4 rounded-xl text-sm font-bold animate-fade-in shadow-[inset_1px_1px_3px_rgba(255,255,255,1)]">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading || !work.trim()}
          className="clay-btn-primary w-full py-4 text-[13px] uppercase tracking-widest font-black font-mono mt-2"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}