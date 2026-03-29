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
    <div className="clay-card-interactive flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h4 className="text-[#2D3748] font-black text-lg mb-3 leading-tight">{field}</h4>
            <span className={`badge-clay-primary`}>
              {level}
            </span>
          </div>
          <span className="text-2xl font-black font-mono text-[#6C63FF] tracking-tighter drop-shadow-sm">
            {progress}%
          </span>
        </div>

        <div className="w-full bg-[#EAEFF5] rounded-full h-2 mb-6 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1),inset_-1px_-1px_3px_rgba(255,255,255,1)] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out bg-[#6C63FF] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-5 border-t border-[#D1D9E6]">
        <span className="text-[#718096] font-mono text-[10px] uppercase tracking-widest font-bold bg-[#F5F8FA] px-3 py-1.5 rounded-lg shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.03),1px_1px_3px_#c8d0e7]">
          {completedTasks}/{totalTasks} tasks
        </span>
        <Link
          href={`/tracks/${id}`}
          className="text-[#6C63FF] hover:text-[#7D75FF] text-sm font-bold flex items-center gap-2 transition-colors relative"
        >
          Continue 
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}