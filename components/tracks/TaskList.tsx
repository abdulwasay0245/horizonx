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
      <h3 className="text-xl font-semibold text-[#F0F0FF] tracking-tight mb-6">Tasks</h3>
      <div className="space-y-4">
        {tasks.map((task, index) => {
          const isCompleted = completedTaskIds.includes(task.id)
          const isLocked = !isEnrolled || (index > 0 && !completedTaskIds.includes(tasks[index - 1].id))

          return (
            <div
              key={task.id}
              className={`vercel-card !p-5 transition-all duration-300 border-l-4 ${
                isCompleted
                  ? 'border-l-[#00C896] bg-[#0A0A0F]'
                  : isLocked
                  ? 'border-l-[#242430] opacity-50 grayscale bg-[#0A0A0F]'
                  : 'border-l-[#6C63FF] shadow-[0_0_20px_rgba(108,99,255,0.05)] bg-[#111118]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-4 flex-1">
                  <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center font-mono text-sm font-bold border ${
                    isCompleted
                      ? 'bg-[#00C896]/10 text-[#00C896] border-[#00C896]/20'
                      : isLocked
                      ? 'bg-[#1A1A24] text-[#5A5A70] border-[#242430]'
                      : 'bg-[#6C63FF]/10 text-[#6C63FF] border-[#6C63FF]/20'
                  }`}>
                    {isCompleted ? <Check size={16} /> : task.order_number}
                  </div>
                  <div>
                    <h4 className={`text-base font-semibold tracking-tight ${isLocked ? 'text-[#5A5A70]' : 'text-[#F0F0FF]'}`}>
                      {task.title}
                    </h4>
                    <p className="text-[#9090A8] text-sm mt-1 sm:line-clamp-1 leading-relaxed max-w-xl pr-4">{task.description}</p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center sm:self-auto self-start ml-14 sm:ml-0">
                  {!isLocked && (
                    <Link
                      href={`/tracks/${trackId}/task/${task.id}`}
                      className={`text-xs font-semibold px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        isCompleted
                          ? 'bg-transparent text-[#00C896] border border-[#00C896]/20 hover:border-[#00C896]/50'
                          : 'btn-primary !px-6 !py-2 !rounded-lg'
                      }`}
                    >
                      {isCompleted ? 'Review' : <>Start Task <ArrowRight size={14} /></>}
                    </Link>
                  )}

                  {isLocked && (
                    <div className="w-8 h-8 rounded-lg bg-[#1A1A24] flex items-center justify-center border border-[#242430] mx-2">
                       <Lock size={14} className="text-[#5A5A70]" />
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
