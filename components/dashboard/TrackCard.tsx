import Link from 'next/link'

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
  const levelColor: Record<string, string> = {
    beginner: 'bg-green-500/20 text-green-400',
    intermediate: 'bg-yellow-500/20 text-yellow-400',
    advanced: 'bg-red-500/20 text-red-400',
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-white font-bold mb-1">{field}</h4>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${levelColor[level]}`}>
            {level}
          </span>
        </div>
        <span className="text-2xl font-black text-white">{progress}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">{completedTasks}/{totalTasks} tasks</span>
        <Link
          href={`/tracks/${id}`}
          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition"
        >
          Continue →
        </Link>
      </div>
    </div>
  )
}