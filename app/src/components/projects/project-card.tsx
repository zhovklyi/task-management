import type React from "react"
import Card from "../ui/card"
import Badge from "../ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  status: string
  taskCount: number
  completionPercentage: number
  icon: React.ReactNode
  iconBgColor: string
  className?: string
  onClick?: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  status,
  taskCount,
  completionPercentage,
  icon,
  iconBgColor,
  className = "",
  onClick
}) => {
  const getStatusVariant = (status: string): 'success' | 'warning' | 'info' | 'default' => {
    switch (status.toLowerCase()) {
      case 'active': return 'success'
      case 'in progress': return 'warning'
      case 'planning': return 'info'
      default: return 'default'
    }
  }

  const getCompletionColor = (percentage: number): string => {
    if (percentage >= 75) return 'bg-emerald-500'
    if (percentage >= 50) return 'bg-amber-500'
    return 'bg-blue-500'
  }

  return (
    <Card className={`group ${className} ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}`} onClick={onClick}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center shadow-md`}>
          {icon}
        </div>

        <Badge variant={getStatusVariant(status)} size="sm">
          {status}
        </Badge>
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>

      <p className="text-slate-600 mb-3 text-sm leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">{taskCount} tasks</span>

        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 ${getCompletionColor(completionPercentage)} rounded-full`}></div>
          <span className="text-xs text-slate-500">{completionPercentage}% complete</span>
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard
