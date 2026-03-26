'use client'

import { useEffect, useRef, useState } from 'react'

interface StatItemProps {
  value: number
  suffix: string
  label: string
}

function StatItem({ value, suffix, label }: StatItemProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center relative">
      <div className="text-5xl md:text-6xl font-black font-mono text-[#F0F0FF] tracking-tighter mb-2">
        {count.toLocaleString()}<span className="text-[#6C63FF]">{suffix}</span>
      </div>
      <p className="text-[#5A5A70] font-semibold uppercase tracking-[0.08em] text-xs">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="py-16 md:py-24 px-6 bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <StatItem value={500} suffix="+" label="Active Learners" />
          <StatItem value={20} suffix="+" label="Learning Tracks" />
          <StatItem value={200} suffix="+" label="Verified Audits" />
          <StatItem value={95} suffix="%" label="Completion" />
        </div>
      </div>
    </section>
  )
}
