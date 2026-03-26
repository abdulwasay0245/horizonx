import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface TrackCardProps {
  id: string
  field: string
  level: string
  progress: number
  totalTasks: number
  completedTasks: number
}

export default function TrackCard({
  id, field, level, progress, totalTasks, completedTasks
}: TrackCardProps) {
  return (
    <div className="vercel-card flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h4 className="text-[#F0F0FF] font-semibold text-lg mb-2">{field}</h4>
            <span className={`badge-${level.toLowerCase()}`}>
              {level}
            </span>
          </div>
          <span className="text-2xl font-black font-mono text-[#6C63FF] tracking-tighter">
            {progress}%
          </span>
        </div>

        <div className="w-full bg-[#1A1A24] rounded-full h-1.5 mb-6 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-[#6C63FF] to-[#00D4FF]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#242430]">
        <span className="text-[#5A5A70] font-mono text-[10px] uppercase tracking-widest font-bold">
          {completedTasks}/{totalTasks} tasks
        </span>
        <Link
          href={`/tracks/${id}`}
          className="text-[#F0F0FF] hover:text-[#6C63FF] text-sm font-semibold flex items-center gap-2 transition-colors group"
        >
          Continue 
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}