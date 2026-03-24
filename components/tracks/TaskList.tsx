import Link from 'next/link'

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
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Tasks</h3>
      <div className="space-y-3">
        {tasks.map((task, index) => {
          const isCompleted = completedTaskIds.includes(task.id)
          const isLocked = !isEnrolled || (index > 0 && !completedTaskIds.includes(tasks[index - 1].id))

          return (
            <div
              key={task.id}
              className={`bg-gray-900 border rounded-2xl p-5 transition ${
                isCompleted
                  ? 'border-green-500/30'
                  : isLocked
                  ? 'border-gray-800 opacity-60'
                  : 'border-blue-500/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCompleted
                      ? 'bg-green-500/20 text-green-400'
                      : isLocked
                      ? 'bg-gray-800 text-gray-600'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {isCompleted ? '✓' : task.order_number}
                  </div>
                  <div>
                    <h4 className={`font-bold ${isLocked ? 'text-gray-500' : 'text-white'}`}>
                      {task.title}
                    </h4>
                    <p className="text-gray-400 text-sm mt-0.5 line-clamp-1">{task.description}</p>
                  </div>
                </div>

                {!isLocked && (
                  <Link
                    href={`/tracks/${trackId}/task/${task.id}`}
                    className={`text-sm font-bold px-4 py-2 rounded-lg transition whitespace-nowrap ml-4 ${
                      isCompleted
                        ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isCompleted ? '✓ Done' : 'Start →'}
                  </Link>
                )}

                {isLocked && (
                  <span className="text-gray-600 text-sm ml-4">🔒</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
