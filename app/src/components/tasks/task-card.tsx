import type React from "react"
import Card from "../ui/card"
import Badge from "../ui/badge"

interface TaskCardProps {
  title: string
  description: string
  project: string
  dueDate: string
  status: string
  priority: string
  statusColor: string
  className?: string
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  project,
  dueDate,
  status,
  priority,
  statusColor,
  className = ""
}) => {
  const getStatusVariant = (status: string): 'success' | 'info' | 'warning' | 'default' => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success'
      case 'in progress': return 'info'
      case 'to do': return 'warning'
      default: return 'default'
    }
  }

  const getPriorityVariant = (priority: string): 'danger' | 'warning' | 'success' | 'default' => {
    switch (priority.toLowerCase()) {
      case 'high': return 'danger'
      case 'medium': return 'warning'
      case 'low': return 'success'
      default: return 'default'
    }
  }

  return (
    <Card className={className}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-2 h-2 ${statusColor} rounded-full`}></div>
            <h3 className="text-base font-semibold text-slate-800">{title}</h3>
          </div>

          <p className="text-slate-600 mb-3 text-sm leading-relaxed">
            {description}
          </p>

          <div className="flex items-center space-x-4 text-xs text-slate-500">
            <span className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>{project}</span>
            </span>

            <span className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Due: {dueDate}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant={getStatusVariant(status)} size="sm">
            {status}
          </Badge>

          <Badge variant={getPriorityVariant(priority)} size="sm">
            {priority}
          </Badge>
        </div>
      </div>
    </Card>
  )
}

export default TaskCard
