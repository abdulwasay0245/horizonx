import { ReactNode } from 'react'

interface StatsCardProps {
  label: string
  value: string | number
  icon: ReactNode
  color?: 'blue' | 'green' | 'purple' | 'yellow'
}

export default function StatsCard({ label, value, icon, color = 'blue' }: StatsCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'text-[#00D4FF] bg-[#00D4FF]/10',
    green: 'text-[#00C896] bg-[#00C896]/10',
    purple: 'text-[#6C63FF] bg-[#6C63FF]/10',
    yellow: 'text-[#FFB340] bg-[#FFB340]/10',
  }

  return (
    <div className="vercel-card flex flex-col justify-between">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-6 ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <div className="font-mono text-3xl font-black text-[#F0F0FF] tracking-tighter mb-1">{value}</div>
        <div className="text-[#5A5A70] font-mono uppercase tracking-[0.08em] text-[10px] font-bold">{label}</div>
      </div>
    </div>
  )
}