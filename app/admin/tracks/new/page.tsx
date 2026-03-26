'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Layers, ArrowRight } from 'lucide-react'

interface Field {
  id: string
  name: string
}

export default function NewTrackPage() {
  const router = useRouter()
  const supabase = createClient()

  const [fields, setFields] = useState<Field[]>([])
  const [fieldId, setFieldId] = useState('')
  const [level, setLevel] = useState('beginner')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadFields() {
      const { data } = await supabase.from('fields').select('id, name').order('name')
      setFields(data || [])
    }
    loadFields()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!fieldId) {
      setError('Please select a domain to associate with this track.')
      return
    }
    setLoading(true)
    setError('')

    const { error: insertError } = await supabase.from('tracks').insert({
      field_id: fieldId,
      level,
      description,
      is_active: true,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    router.push('/admin/tracks')
    router.refresh()
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-10 border-b border-[#242430] pb-6">
        <h2 className="text-2xl font-black text-[#F0F0FF] tracking-tight mb-2 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#6C63FF]/10 text-[#6C63FF] border border-[#6C63FF]/20 rounded-lg flex items-center justify-center">
            <Layers size={16} />
          </div>
          Initialize Architecture
        </h2>
        <p className="text-[#9090A8] text-sm leading-relaxed">Define a new learning curriculum pathway and set metadata parameters.</p>
      </div>

      <div className="vercel-card">
        <form onSubmit={handleCreate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest mb-2 block">Domain Vector</label>
              <select
                value={fieldId}
                onChange={(e) => setFieldId(e.target.value)}
                className="vercel-input w-full"
              >
                <option value="">Select a domain...</option>
                {fields.map((field) => (
                  <option key={field.id} value={field.id}>{field.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest mb-2 block">Difficulty Matrix</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="vercel-input w-full"
              >
                <option value="beginner">Beginner Spec</option>
                <option value="intermediate">Intermediate Spec</option>
                <option value="advanced">Advanced Spec</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest mb-2 block">Curriculum Abstract</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              placeholder="Describe the primary objectives and contents of this learning track execution..."
              className="vercel-input w-full resize-none leading-relaxed"
            />
          </div>

          {error && (
            <div className="bg-[#FF4D6A]/10 border border-[#FF4D6A]/20 text-[#FF4D6A] px-5 py-4 rounded-xl text-sm font-semibold">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#242430]">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full sm:w-2/3 flex items-center justify-center gap-2"
            >
              {loading ? 'Initializing Protocol...' : (
                <>
                  Publish Root Track <ArrowRight size={16} />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary w-full sm:w-1/3 text-[#F0F0FF]"
            >
               Halt Process
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
