import type React from "react"
import Card from "./card"

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'increase' | 'decrease'
  icon: string
  className?: string
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  className = ""
}) => {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-600 mb-1">{title}</p>

          <p className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            {value}
          </p>
        </div>

        <div className="text-3xl">{icon}</div>
      </div>

      {change && (
        <div className="mt-3">
          <span className={`text-xs font-medium ${
            changeType === 'increase' ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {change}
          </span>

          <span className="text-xs text-slate-500 ml-1">from last week</span>
        </div>
      )}
    </Card>
  )
}

export default StatCard
