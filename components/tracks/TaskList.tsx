import Link from 'next/link'
import { Check, Lock, ArrowRight } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  order_number: number
}

interface TaskListProps {
  tasks: Task[]
  completedTaskIds: string[]
  isEnrolled: boolean
  trackId: string
}

export default function TaskList({ tasks, completedTaskIds, isEnrolled, trackId }: TaskListProps) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-black text-[#2D3748] tracking-tight mb-6 drop-shadow-sm">Tasks</h3>
      <div className="space-y-4">
        {tasks.map((task, index) => {
          const isCompleted = completedTaskIds.includes(task.id)
          const isLocked = !isEnrolled || (index > 0 && !completedTaskIds.includes(tasks[index - 1].id))

          return (
            <div
              key={task.id}
              className={`clay-card !p-5 transition-all duration-300 border-l-4 bg-[#F5F8FA] flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                isCompleted
                  ? 'border-l-[#00C896] shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.02),2px_2px_5px_#c8d0e7]'
                  : isLocked
                  ? 'border-l-[#D1D9E6] opacity-60 grayscale shadow-none border border-[#D1D9E6]/50 bg-[#EAEFF5]'
                  : 'border-l-[#6C63FF] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),inset_-2px_-2px_5px_rgba(0,0,0,0.03),3px_3px_8px_#c8d0e7]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full">
                <div className="flex items-start sm:items-center gap-4 flex-1">
                  <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center font-mono text-sm font-black border ${
                    isCompleted
                      ? 'bg-[#00C896]/10 text-[#00C896] border-[#00C896]/20 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8)]'
                      : isLocked
                      ? 'bg-[#EAEFF5] text-[#A0AEC0] border-[#D1D9E6] shadow-none'
                      : 'bg-[#F5F8FA] text-[#6C63FF] border-[#6C63FF]/20 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7] drop-shadow-sm'
                  }`}>
                    {isCompleted ? <Check size={20} className="drop-shadow-sm" /> : task.order_number}
                  </div>
                  <div>
                    <h4 className={`text-base font-black tracking-tight mb-1 ${isLocked ? 'text-[#718096]' : 'text-[#2D3748] drop-shadow-sm'}`}>
                      {task.title}
                    </h4>
                    <p className={`text-sm sm:line-clamp-1 leading-relaxed max-w-xl pr-4 font-medium ${isLocked ? 'text-[#A0AEC0]' : 'text-[#718096]'}`}>{task.description}</p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center sm:self-auto self-start ml-16 sm:ml-0">
                  {!isLocked && (
                    <Link
                      href={`/tracks/${trackId}/task/${task.id}`}
                      className={`text-[13px] font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                        isCompleted
                          ? 'bg-[#EAEFF5] text-[#00C896] hover:bg-[#F5F8FA] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05),inset_-1px_-1px_3px_rgba(255,255,255,1)] hover:shadow-[2px_2px_5px_#c8d0e7,inset_-1px_-1px_2px_rgba(255,255,255,0.8)]'
                          : 'clay-btn-primary py-3'
                      }`}
                    >
                      {isCompleted ? 'Review' : <>Start Task <ArrowRight size={16} /></>}
                    </Link>
                  )}

                  {isLocked && (
                    <div className="w-10 h-10 rounded-xl bg-[#EAEFF5] flex items-center justify-center border border-[#D1D9E6] mx-2 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05)]">
                       <Lock size={16} className="text-[#A0AEC0]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
