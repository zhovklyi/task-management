import type React from "react"
import Button from "./button"

interface PageHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
  }
  className?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  className = ""
}) => {
  return (
    <div className={`bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-md border border-slate-200/60 p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            {title}
          </h1>

          {description && (
            <p className="text-slate-600">{description}</p>
          )}
        </div>

        {action && (
          <Button
            variant={action.variant || 'primary'}
            size={action.size || 'md'}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}

export default PageHeader
