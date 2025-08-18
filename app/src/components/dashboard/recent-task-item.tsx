import type React from "react"
import Badge from "../ui/badge"

interface RecentTaskItemProps {
  title: string
  dueDate: string
  status: string
  priority: string
  className?: string
}

const RecentTaskItem: React.FC<RecentTaskItemProps> = ({
  title,
  dueDate,
  status,
  priority,
  className = ""
}) => {
  const getStatusVariant = (status: string): 'success' | 'info' | 'warning' | 'default' => {
    switch (status) {
      case 'completed': return 'success'
      case 'in-progress': return 'info'
      case 'pending': return 'warning'
      default: return 'default'
    }
  }

  const getPriorityVariant = (priority: string): 'danger' | 'warning' | 'success' | 'default' => {
    switch (priority) {
      case 'high': return 'danger'
      case 'medium': return 'warning'
      case 'low': return 'success'
      default: return 'default'
    }
  }

  return (
    <div className={`flex items-center justify-between p-3 bg-slate-50/50 rounded-lg hover:bg-slate-100/50 transition-colors ${className}`}>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-800 mb-1 text-sm">{title}</h3>

        <div className="flex items-center space-x-4 text-xs text-slate-500">
          <span>Due: {dueDate}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Badge variant={getStatusVariant(status)} size="sm">
          {status.replace('-', ' ')}
        </Badge>

        <Badge variant={getPriorityVariant(priority)} size="sm">
          {priority}
        </Badge>
      </div>
    </div>
  )
}

export default RecentTaskItem
