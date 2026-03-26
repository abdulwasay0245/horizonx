'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Database, Plus, X, ServerCrash } from 'lucide-react'

interface Question {
  id: string
  track_id: string
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
}

interface Track {
  id: string
  level: string
  fields: { name: string } | null
}

export default function AdminQuestionsPage() {
  const supabase = createClient()

  const [tracks, setTracks] = useState<Track[]>([])
  const [selectedTrack, setSelectedTrack] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)

  // New question form
  const [showForm, setShowForm] = useState(false)
  const [questionText, setQuestionText] = useState('')
  const [optA, setOptA] = useState('')
  const [optB, setOptB] = useState('')
  const [optC, setOptC] = useState('')
  const [optD, setOptD] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('a')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadTracks() {
      const { data } = await supabase
        .from('tracks')
        .select('id, level, fields(name)')
        .order('created_at')
      setTracks((data as unknown as Track[]) || [])
    }
    loadTracks()
  }, [])

  useEffect(() => {
    if (!selectedTrack) {
      setQuestions([])
      return
    }
    async function loadQuestions() {
      setLoading(true)
      const { data } = await supabase
        .from('questions')
        .select('*')
        .eq('track_id', selectedTrack)
        .order('created_at')
      setQuestions(data || [])
      setLoading(false)
    }
    loadQuestions()
  }, [selectedTrack])

  async function handleAddQuestion(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    await supabase.from('questions').insert({
      track_id: selectedTrack,
      question: questionText,
      option_a: optA,
      option_b: optB,
      option_c: optC,
      option_d: optD,
      correct_answer: correctAnswer,
    })

    // Reload questions
    const { data } = await supabase
      .from('questions')
      .select('*')
      .eq('track_id', selectedTrack)
      .order('created_at')
    setQuestions(data || [])

    // Reset form
    setQuestionText('')
    setOptA('')
    setOptB('')
    setOptC('')
    setOptD('')
    setCorrectAnswer('a')
    setShowForm(false)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if(!confirm("Are you sure you want to permanently delete this question?")) return;
    await supabase.from('questions').delete().eq('id', id)
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  return (
    <div>
      <div className="mb-10 border-b border-[#242430] pb-6">
         <h2 className="text-3xl font-black text-[#F0F0FF] tracking-tight mb-2">Evaluation Architecture</h2>
         <p className="text-[#9090A8] text-sm">Manage test logic and query nodes across learning boundaries.</p>
      </div>

      {/* Track selector */}
      <div className="vercel-card mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
         <label className="text-[#9090A8] text-sm font-semibold whitespace-nowrap">Target Specification:</label>
         <select
           value={selectedTrack}
           onChange={(e) => setSelectedTrack(e.target.value)}
           className="vercel-input w-full sm:w-auto min-w-[320px]"
         >
           <option value="">Select a curriculum context...</option>
           {tracks.map((track) => (
             <option key={track.id} value={track.id}>
               {track.fields?.name || 'Unknown'} — {track.level}
             </option>
           ))}
         </select>
      </div>

      {selectedTrack && (
        <div className="animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#242430]">
            <h3 className="text-lg font-bold text-[#F0F0FF] tracking-tight flex items-center gap-3">
               Query Index <span className="bg-[#1A1A24] text-[#9090A8] border border-[#242430] px-2 py-0.5 rounded text-xs font-mono">{questions.length}</span>
            </h3>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary !px-4 !py-2 text-sm flex items-center gap-2"
            >
              {showForm ? <X size={16} /> : <Plus size={16} />} {showForm ? 'Halt Process' : 'Append Node'}
            </button>
          </div>

          {/* Add question form */}
          {showForm && (
            <div className="vercel-card mb-8">
              <div className="flex items-center gap-2 mb-6 text-[#F0F0FF] font-semibold border-b border-[#242430] pb-4">
                 <Database size={18} className="text-[#6C63FF]" /> Define Execution Query
              </div>
              <form onSubmit={handleAddQuestion} className="space-y-6">
                <div>
                  <label className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest mb-2 block">Interrogation String</label>
                  <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                    rows={2}
                    className="vercel-input w-full resize-none font-mono text-sm leading-relaxed"
                    placeholder="Enter the question text here..."
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                     { id: 'optA', val: optA, set: setOptA, char: 'A' },
                     { id: 'optB', val: optB, set: setOptB, char: 'B' },
                     { id: 'optC', val: optC, set: setOptC, char: 'C' },
                     { id: 'optD', val: optD, set: setOptD, char: 'D' }
                  ].map(opt => (
                    <div key={opt.id} className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A5A70] font-mono font-bold w-6 text-center">{opt.char}</div>
                      <input 
                         value={opt.val} 
                         onChange={(e) => opt.set(e.target.value)} 
                         required 
                         className="vercel-input w-full !pl-12 font-mono text-sm" 
                         placeholder={`Parameter ${opt.char} string`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#242430]">
                   <div className="flex items-center gap-4 w-full sm:w-auto">
                     <label className="text-[#5A5A70] font-mono text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">Expected Resolution Key:</label>
                     <select
                       value={correctAnswer}
                       onChange={(e) => setCorrectAnswer(e.target.value)}
                       className="vercel-input min-w-[120px] !py-2 uppercase font-mono text-xs font-bold"
                     >
                       <option value="a">A</option>
                       <option value="b">B</option>
                       <option value="c">C</option>
                       <option value="d">D</option>
                     </select>
                   </div>
                   <button
                     type="submit"
                     disabled={saving}
                     className="btn-primary w-full sm:w-auto"
                   >
                     {saving ? 'Committing...' : 'Commit to Database'}
                   </button>
                </div>
              </form>
            </div>
          )}

          {/* Questions list */}
          {loading ? (
            <div className="text-center py-16 text-[#5A5A70] font-mono text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3">
               <Database className="animate-pulse" size={20} /> Querying Evaluation Nodes...
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className="vercel-card flex flex-col lg:flex-row lg:items-start justify-between gap-6 hover:border-[#3A3A50] transition-colors group">
                  <div className="flex-1">
                    <p className="text-[#F0F0FF] tracking-tight font-semibold mb-6 flex items-start gap-4 text-sm leading-relaxed">
                      <span className="text-[#5A5A70] font-mono text-xs font-bold pt-0.5">#{String(i + 1).padStart(2, '0')}</span>
                      {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {[
                        { key: 'a', text: q.option_a },
                        { key: 'b', text: q.option_b },
                        { key: 'c', text: q.option_c },
                        { key: 'd', text: q.option_d }
                      ].map(opt => (
                        <div key={opt.key} className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                            q.correct_answer === opt.key 
                              ? 'bg-[#00C896]/5 border-[#00C896]/20 text-[#00C896]' 
                              : 'bg-[#0A0A0F] border-[#242430] text-[#9090A8]'
                        }`}>
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[10px] font-bold shrink-0 border ${
                             q.correct_answer === opt.key
                               ? 'bg-[#00C896]/10 border-[#00C896]/20 text-[#00C896]'
                               : 'bg-[#1A1A24] border-[#242430] text-[#5A5A70]'
                          }`}>
                             {opt.key.toUpperCase()}
                          </span>
                          <span className="font-mono text-xs pt-[2px] whitespace-break-spaces">{opt.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="text-[#5A5A70] hover:text-[#FF4D6A] opacity-0 group-hover:opacity-100 px-4 py-2 font-mono text-[10px] font-bold transition uppercase tracking-widest shrink-0"
                  >
                    Delete Vector
                  </button>
                </div>
              ))}
              {questions.length === 0 && (
                <div className="text-center py-16 text-[#5A5A70] flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#1A1A24] text-[#5A5A70] border border-[#242430] rounded-xl flex items-center justify-center mb-4">
                    <ServerCrash size={24} />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest font-bold">Node bank is empty.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
