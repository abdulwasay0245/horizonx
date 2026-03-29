import { ReactNode } from 'react'

interface AdminStatsCardProps {
  label: string
  value: string | number
  icon: ReactNode
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
}

const colorMap = {
  blue: 'text-[#00D4FF] bg-[#EAF9FE] shadow-[inset_1px_1px_3px_rgba(0,212,255,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)]',
  green: 'text-[#00C896] bg-[#EAFBF5] shadow-[inset_1px_1px_3px_rgba(0,200,150,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)]',
  yellow: 'text-[#FFB340] bg-[#FFF8EB] shadow-[inset_1px_1px_3px_rgba(255,179,64,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)]',
  red: 'text-[#FF4D6A] bg-[#FFF0F2] shadow-[inset_1px_1px_3px_rgba(255,100,100,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)]',
  purple: 'text-[#6C63FF] bg-[#F0EFFF] shadow-[inset_1px_1px_3px_rgba(108,99,255,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)]',
}

export default function AdminStatsCard({ label, value, icon, color }: AdminStatsCardProps) {
  return (
    <div className="clay-card flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <div className="font-mono text-3xl font-black text-[#2D3748] tracking-tighter mb-1 drop-shadow-sm">{value}</div>
        <div className="text-[#718096] font-mono uppercase tracking-[0.08em] text-[10px] font-bold">{label}</div>
      </div>
    </div>
  )
}
