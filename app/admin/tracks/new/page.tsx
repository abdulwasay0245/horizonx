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
      <div className="mb-10 border-b border-[#D1D9E6] pb-6">
        <h2 className="text-2xl font-black text-[#2D3748] tracking-tight mb-2 flex items-center gap-3 drop-shadow-sm">
          <div className="w-10 h-10 bg-[#F0EFFF] text-[#6C63FF] border-none shadow-[inset_1px_1px_3px_rgba(255,255,255,0.9),inset_-1px_-1px_3px_rgba(108,99,255,0.1)] rounded-xl flex items-center justify-center">
            <Layers size={20} className="drop-shadow-sm" />
          </div>
          Initialize Architecture
        </h2>
        <p className="text-[#718096] text-[15px] font-medium leading-relaxed">Define a new learning curriculum pathway and set metadata parameters.</p>
      </div>

      <div className="clay-card !bg-[#F5F8FA]">
        <form onSubmit={handleCreate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="text-[#A0AEC0] font-mono text-[11px] font-black uppercase tracking-widest mb-3 block">Domain Vector</label>
              <select
                value={fieldId}
                onChange={(e) => setFieldId(e.target.value)}
                className="clay-input w-full"
              >
                <option value="">Select a domain...</option>
                {fields.map((field) => (
                  <option key={field.id} value={field.id}>{field.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#A0AEC0] font-mono text-[11px] font-black uppercase tracking-widest mb-3 block">Difficulty Matrix</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="clay-input w-full"
              >
                <option value="beginner">Beginner Spec</option>
                <option value="intermediate">Intermediate Spec</option>
                <option value="advanced">Advanced Spec</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[#A0AEC0] font-mono text-[11px] font-black uppercase tracking-widest mb-3 block">Curriculum Abstract</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              placeholder="Describe the primary objectives and contents of this learning track execution..."
              className="clay-input w-full resize-none leading-relaxed"
            />
          </div>

          {error && (
            <div className="bg-[#FFF0F2] text-[#FF4D6A] border-none shadow-[inset_1px_1px_3px_rgba(255,100,100,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] px-5 py-4 rounded-xl text-[15px] font-bold">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-4 border-t border-[#D1D9E6]">
            <button
              type="submit"
              disabled={loading}
              className="clay-btn-primary w-full sm:w-2/3 flex items-center justify-center gap-2"
            >
              {loading ? 'Initializing Protocol...' : (
                <>
                  Publish Root Track <ArrowRight size={18} />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="clay-btn-secondary w-full sm:w-1/3 !text-[#718096] whitespace-nowrap"
            >
               Halt Process
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
