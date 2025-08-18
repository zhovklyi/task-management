import type React from "react"
import Card from "../ui/card"

interface TaskFiltersProps {
  onProjectChange: (value: string) => void
  onStatusChange: (value: string) => void
  onPriorityChange: (value: string) => void
  className?: string
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  onProjectChange,
  onStatusChange,
  onPriorityChange,
  className = ""
}) => {
  return (
    <Card className={className}>
      <h3 className="text-base font-semibold text-slate-800 mb-3">Filters</h3>
      <div className="flex flex-wrap gap-3">
        <select
          onChange={(e) => onProjectChange(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">All Projects</option>
          <option value="alpha">Project Alpha</option>
          <option value="beta">Project Beta</option>
          <option value="gamma">Project Gamma</option>
        </select>

        <select
          onChange={(e) => onStatusChange(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          onChange={(e) => onPriorityChange(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </Card>
  )
}

export default TaskFilters
