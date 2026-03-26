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
    ? 'text-[#FF4D6A] bg-[#FF4D6A]/5 border-[#FF4D6A]/20' 
    : 'text-[#00C896] bg-[#00C896]/5 border-[#00C896]/20'

  return (
    <div className="w-full">
      {/* Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#1A1A24] z-50">
         <div 
           className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] transition-all duration-300"
           style={{ width: `${((current + 1) / questions.length) * 100}%` }}
         />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-[#242430] gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#F0F0FF] tracking-tight mb-1 flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#6C63FF]" /> Certification Exam
          </h2>
          <p className="text-[#5A5A70] font-mono text-[10px] uppercase font-bold tracking-widest">
            Query {current + 1} of {questions.length}
          </p>
        </div>
        
        <div className={`px-4 py-2 rounded-lg border font-mono text-xl font-bold tracking-tight flex items-center gap-2 ${timerColor}`}>
          <Clock size={16} /> {formatTime(timeLeft)}
        </div>
      </div>

      {/* Main Question Card w/ max-w-2xl per spec */}
      <div className="w-full max-w-2xl mx-auto">
        <h3 className="text-[#F0F0FF] text-xl font-semibold mb-8 leading-relaxed tracking-tight">
          {question.question}
        </h3>
        
        <div className="space-y-4">
          {options.map((opt) => {
            const isSelected = selected === opt.key
            return (
              <button
                key={opt.key}
                onClick={() => setSelected(opt.key)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center gap-4 ${
                  isSelected
                    ? 'border-l-4 border-l-[#6C63FF] border-y-[#242430] border-r-[#242430] bg-[#6C63FF]/5 text-[#F0F0FF]'
                    : 'border-[#242430] bg-[#111118] text-[#9090A8] hover:border-[#3A3A50] hover:text-[#F0F0FF]'
                }`}
              >
                <span className={`flex items-center justify-center w-7 h-7 rounded-md border font-mono text-xs font-bold shrink-0 transition-colors ${
                   isSelected 
                     ? 'border-[#6C63FF] bg-[#6C63FF] text-white'
                     : 'border-[#242430] bg-[#1A1A24] text-[#5A5A70]'
                }`}>
                   {opt.key.toUpperCase()}
                </span>
                <span className="text-sm font-medium pt-[2px]">
                   {opt.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#242430] pt-6 mt-12 max-w-2xl mx-auto gap-4">
        <p className="text-[#5A5A70] font-mono text-[10px] uppercase tracking-widest font-bold">
          {totalAnswered} of {questions.length} Queries Resolved
        </p>
        <button
          onClick={handleNext}
          disabled={!selected || submitting}
          className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          {submitting ? 'Verifying Output...' : isLast ? (
            <>
              Confirm & Evaluate <Check size={16} />
            </>
          ) : (
             <>
               Proceed <ArrowRight size={16} />
             </>
          )}
        </button>
      </div>
    </div>
  )
}