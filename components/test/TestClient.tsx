'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Clock, Check, ArrowRight, ShieldCheck } from 'lucide-react'

interface Question {
  id: string
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
}

interface TestClientProps {
  questions: Question[]
  trackId: string
  userId: string
}

export default function TestClient({ questions, trackId, userId }: TestClientProps) {
  const router = useRouter()
  const supabase = createClient()

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(30 * 60)
  const [submitting, setSubmitting] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const submittingRef = useRef(false)

  const question = questions[current]
  const isLast = current === questions.length - 1
  const totalAnswered = Object.keys(answers).length

  async function handleSubmit(finalAnswers: Record<string, string>) {
    if (submittingRef.current) return
    submittingRef.current = true
    setSubmitting(true)

    const { data: correctData } = await supabase
      .from('questions')
      .select('id, correct_answer')
      .in('id', questions.map(q => q.id))

    const correctMap: Record<string, string> = {}
    correctData?.forEach(q => { correctMap[q.id] = q.correct_answer })

    let correct = 0
    questions.forEach(q => {
      if (finalAnswers[q.id] === correctMap[q.id]) correct++
    })

    const score = Math.round((correct / questions.length) * 100)
    const passed = score >= 50

    await supabase.from('test_attempts').insert({
      user_id: userId,
      track_id: trackId,
      score,
      passed
    })

    if (passed) {
      const { data: certData } = await supabase.from('certificates').insert({
        user_id: userId,
        track_id: trackId,
        score
      }).select('id').single()

      // Send certificate email (fire-and-forget)
      if (certData) {
        const { data: { user } } = await supabase.auth.getUser()
        fetch('/api/email/certificate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user?.email,
            name: user?.user_metadata?.name || 'Student',
            trackName: 'your completed track',
            score,
            certificateId: certData.id,
          }),
        }).catch(() => {})
      }
    }

    router.push(`/tracks/${trackId}/result?score=${score}&passed=${passed}`)
  }

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit(answers)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [answers])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  function handleNext() {
    if (!selected) return
    const updated = { ...answers, [question.id]: selected }
    setAnswers(updated)
    setSelected(null)
    if (isLast) {
      handleSubmit(updated)
    } else {
      setCurrent(prev => prev + 1)
    }
  }

  const options = [
    { key: 'a', label: question.option_a },
    { key: 'b', label: question.option_b },
    { key: 'c', label: question.option_c },
    { key: 'd', label: question.option_d },
  ]

  const timerColor = timeLeft < 300 
    ? 'text-[#FF4D6A] bg-[#FFF0F2] shadow-[inset_1px_1px_3px_rgba(255,100,100,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)]' 
    : 'text-[#00C896] bg-[#EAFBF5] shadow-[inset_1px_1px_3px_rgba(0,200,150,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)]'

  return (
    <div className="w-full">
      {/* Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-[#EAEFF5] z-50 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]">
         <div 
           className="h-full bg-[#6C63FF] transition-all duration-300 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]"
           style={{ width: `${((current + 1) / questions.length) * 100}%` }}
         />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-[#D1D9E6] gap-4">
        <div>
          <h2 className="text-xl font-black text-[#2D3748] tracking-tight mb-2 flex items-center gap-2 drop-shadow-sm">
            <ShieldCheck size={24} className="text-[#6C63FF] drop-shadow-sm" /> Technical Evaluation
          </h2>
          <p className="text-[#718096] font-mono text-[10px] uppercase font-bold tracking-widest bg-[#F5F8FA] px-3 py-1.5 rounded-lg inline-block shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.02),1px_1px_3px_#c8d0e7]">
            Query {current + 1} of {questions.length}
          </p>
        </div>
        
        <div className={`px-5 py-2.5 rounded-xl font-mono text-xl font-black tracking-tight flex items-center gap-2 drop-shadow-sm ${timerColor}`}>
          <Clock size={20} /> {formatTime(timeLeft)}
        </div>
      </div>

      {/* Main Question Card w/ max-w-2xl per spec */}
      <div className="w-full max-w-2xl mx-auto">
        <h3 className="text-[#2D3748] text-2xl font-black mb-8 leading-relaxed tracking-tight drop-shadow-sm">
          {question.question}
        </h3>
        
        <div className="space-y-4">
          {options.map((opt) => {
            const isSelected = selected === opt.key
            return (
              <button
                key={opt.key}
                onClick={() => setSelected(opt.key)}
                className={`w-full text-left px-5 py-5 rounded-2xl transition-all duration-200 flex items-center gap-4 ${
                  isSelected
                    ? 'bg-[#F5F8FA] text-[#6C63FF] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),inset_-2px_-2px_5px_rgba(0,0,0,0.05),3px_3px_8px_#c8d0e7] font-black scale-[1.01]'
                    : 'bg-[#EAEFF5] text-[#4A5568] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.02),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[3px_3px_6px_#c8d0e7,inset_-1px_-1px_2px_rgba(255,255,255,0.8)] font-bold'
                }`}
              >
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg font-mono text-xs font-black shrink-0 transition-all ${
                   isSelected 
                     ? 'bg-[#6C63FF] text-white shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]'
                     : 'bg-[#F5F8FA] text-[#A0AEC0] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05),inset_-1px_-1px_3px_rgba(255,255,255,1)]'
                }`}>
                   {opt.key.toUpperCase()}
                </span>
                <span className="text-[15px] pt-[2px]">
                   {opt.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#D1D9E6] pt-8 mt-12 max-w-2xl mx-auto gap-4">
        <p className="text-[#718096] font-mono text-[10px] uppercase tracking-widest font-bold bg-[#F5F8FA] px-3 py-1.5 rounded-lg shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.02),1px_1px_3px_#c8d0e7]">
          {totalAnswered} of {questions.length} Queries Resolved
        </p>
        <button
          onClick={handleNext}
          disabled={!selected || submitting}
          className="clay-btn-primary flex items-center justify-center gap-3 w-full sm:w-auto py-3.5 px-8"
        >
          {submitting ? 'Verifying Output...' : isLast ? (
            <>
              Confirm & Evaluate <Check size={18} />
            </>
          ) : (
             <>
               Proceed <ArrowRight size={18} />
             </>
          )}
        </button>
      </div>
    </div>
  )
}