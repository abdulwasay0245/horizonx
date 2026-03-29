import { ReactNode } from 'react'

interface StatsCardProps {
  label: string
  value: string | number
  icon: ReactNode
  color?: 'blue' | 'green' | 'purple' | 'yellow'
}

export default function StatsCard({ label, value, icon, color = 'blue' }: StatsCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'text-[#00D4FF]',
    green: 'text-[#00C896]',
    purple: 'text-[#6C63FF]',
    yellow: 'text-[#FFB340]',
  }

  return (
    <div className="clay-card flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
      <div className={`inline-flex items-center justify-center w-12 h-12 bg-[#F5F8FA] rounded-2xl mb-6 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.05),2px_2px_6px_#c8d0e7] ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <div className="font-mono text-3xl font-black text-[#2D3748] tracking-tighter mb-1 drop-shadow-sm">{value}</div>
        <div className="text-[#718096] font-mono uppercase tracking-[0.08em] text-[10px] font-bold">{label}</div>
      </div>
    </div>
  )
}