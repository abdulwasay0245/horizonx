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
      <div className="mb-10 border-b border-[#D1D9E6] pb-6">
         <h2 className="text-3xl font-black text-[#2D3748] tracking-tight mb-2 drop-shadow-sm">Evaluation Architecture</h2>
         <p className="text-[#718096] text-sm font-medium">Manage test logic and query nodes across learning boundaries.</p>
      </div>

      {/* Track selector */}
      <div className="clay-card mb-8 flex flex-col sm:flex-row sm:items-center gap-4 bg-[#F5F8FA]">
         <label className="text-[#718096] text-sm font-bold whitespace-nowrap drop-shadow-sm">Target Specification:</label>
         <select
           value={selectedTrack}
           onChange={(e) => setSelectedTrack(e.target.value)}
           className="w-full sm:w-auto min-w-[320px] bg-[#EAEFF5] border-none text-[#2D3748] rounded-xl px-5 py-3 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] focus:ring-4 focus:ring-[#6C63FF]/30 outline-none transition-all font-mono font-bold text-[13px] cursor-pointer"
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#D1D9E6]">
            <h3 className="text-lg font-black text-[#2D3748] tracking-tight flex items-center gap-3 drop-shadow-sm">
               Query Index <span className="bg-[#EAEFF5] text-[#718096] border border-[#D1D9E6] px-2.5 py-1 rounded-md text-xs font-mono shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.02),1px_1px_2px_#c8d0e7] drop-shadow-sm font-bold">{questions.length}</span>
            </h3>
            <button
              onClick={() => setShowForm(!showForm)}
              className="clay-btn-primary py-2.5 px-6 text-[13px] flex items-center gap-2 font-black"
            >
              {showForm ? <X size={18} /> : <Plus size={18} />} {showForm ? 'Halt Process' : 'Append Node'}
            </button>
          </div>

          {/* Add question form */}
          {showForm && (
            <div className="clay-card mb-8 bg-[#F5F8FA]">
              <div className="flex items-center gap-2 mb-6 text-[#2D3748] font-black border-b border-[#D1D9E6] pb-4 drop-shadow-sm text-lg">
                 <Database size={20} className="text-[#6C63FF] drop-shadow-sm" /> Define Execution Query
              </div>
              <form onSubmit={handleAddQuestion} className="space-y-6">
                <div>
                  <label className="text-[#A0AEC0] font-mono text-[10px] font-black uppercase tracking-widest mb-2 block">Interrogation String</label>
                  <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                    rows={2}
                    className="w-full bg-[#EAEFF5] border-none text-[#2D3748] rounded-2xl px-5 py-4 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] focus:ring-4 focus:ring-[#6C63FF]/30 outline-none transition-all placeholder:text-[#A0AEC0] font-mono font-bold resize-none leading-relaxed text-sm"
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
                      <div className="absolute left-4 top-[18px] text-[#A0AEC0] font-mono font-black w-6 text-center">{opt.char}</div>
                      <input 
                         value={opt.val} 
                         onChange={(e) => opt.set(e.target.value)} 
                         required 
                         className="w-full bg-[#EAEFF5] border-none text-[#2D3748] rounded-xl pl-[44px] pr-4 py-3 shadow-[inset_1px_1px_4px_rgba(0,0,0,0.05),inset_-1px_-1px_4px_rgba(255,255,255,0.9)] focus:ring-4 focus:ring-[#6C63FF]/30 outline-none transition-all placeholder:text-[#A0AEC0] font-mono font-bold text-sm" 
                         placeholder={`Parameter ${opt.char} string`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#D1D9E6]">
                   <div className="flex items-center gap-4 w-full sm:w-auto">
                     <label className="text-[#A0AEC0] font-mono text-[10px] uppercase font-black tracking-widest whitespace-nowrap">Expected Resolution Key:</label>
                     <select
                       value={correctAnswer}
                       onChange={(e) => setCorrectAnswer(e.target.value)}
                       className="min-w-[120px] bg-[#EAEFF5] border-none text-[#2D3748] rounded-xl px-4 py-2.5 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] focus:ring-4 focus:ring-[#6C63FF]/30 outline-none transition-all uppercase font-mono text-[13px] font-black cursor-pointer"
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
                     className="clay-btn-primary w-full sm:w-auto py-3.5 px-8 font-black text-[13px] uppercase tracking-widest"
                   >
                     {saving ? 'Committing...' : 'Commit to Database'}
                   </button>
                </div>
              </form>
            </div>
          )}

          {/* Questions list */}
          {loading ? (
            <div className="text-center py-16 text-[#A0AEC0] font-mono text-[13px] uppercase tracking-widest font-black flex items-center justify-center gap-3 bg-[#F5F8FA] rounded-3xl shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),inset_-2px_-2px_5px_rgba(0,0,0,0.03),3px_3px_8px_#c8d0e7]">
               <Database className="animate-pulse" size={24} /> Querying Evaluation Nodes...
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className="clay-card bg-[#F5F8FA] flex flex-col lg:flex-row lg:items-start justify-between gap-6 hover:shadow-[3px_3px_8px_#c8d0e7,inset_-1px_-1px_3px_rgba(255,255,255,0.9)] transition-all group">
                  <div className="flex-1">
                    <p className="text-[#2D3748] tracking-tight font-black mb-6 flex items-start gap-4 text-[15px] leading-relaxed drop-shadow-sm">
                      <span className="text-[#718096] bg-[#EAEFF5] px-2 py-1 rounded-md shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05),1px_1px_2px_#c8d0e7] font-mono text-xs font-bold pt-0.5 mt-0.5">#{String(i + 1).padStart(2, '0')}</span>
                      {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                      {[
                        { key: 'a', text: q.option_a },
                        { key: 'b', text: q.option_b },
                        { key: 'c', text: q.option_c },
                        { key: 'd', text: q.option_d }
                      ].map(opt => (
                        <div key={opt.key} className={`flex items-start gap-3 p-3.5 rounded-xl transition-all ${
                            q.correct_answer === opt.key 
                              ? 'bg-[#EAFBF5] shadow-[inset_1px_1px_3px_rgba(0,200,150,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] text-[#00C896] font-bold' 
                              : 'bg-[#EAEFF5] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05),inset_-1px_-1px_3px_rgba(255,255,255,1)] text-[#718096] font-medium'
                        }`}>
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[10px] font-black shrink-0 ${
                             q.correct_answer === opt.key
                               ? 'bg-[#00C896] text-white shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]'
                               : 'bg-[#F5F8FA] border-[#D1D9E6] text-[#A0AEC0] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9),inset_-1px_-1px_2px_rgba(0,0,0,0.02)] border'
                          }`}>
                             {opt.key.toUpperCase()}
                          </span>
                          <span className="font-mono pt-[3px] whitespace-break-spaces opacity-90">{opt.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="text-[#A0AEC0] hover:text-[#FF4D6A] opacity-0 group-hover:opacity-100 px-4 py-2 font-mono text-[10px] font-black transition-colors uppercase tracking-widest shrink-0"
                  >
                    Delete Vector
                  </button>
                </div>
              ))}
              {questions.length === 0 && (
                <div className="text-center py-16 text-[#A0AEC0] flex flex-col items-center bg-[#F5F8FA] rounded-3xl shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),inset_-2px_-2px_5px_rgba(0,0,0,0.03),3px_3px_8px_#c8d0e7]">
                  <div className="w-16 h-16 bg-[#EAEFF5] text-[#718096] rounded-2xl flex items-center justify-center mb-6 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7]">
                    <ServerCrash size={32} className="drop-shadow-sm" />
                  </div>
                  <p className="font-mono text-[13px] uppercase tracking-widest font-black">Node bank is empty.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
