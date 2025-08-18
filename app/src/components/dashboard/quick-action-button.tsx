import type React from "react"

interface QuickActionButtonProps {
  title: string
  icon: string
  color: string
  onClick?: () => void
  className?: string
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  title,
  icon,
  color,
  onClick,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-md ${color} ${className}`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{icon}</span>
        <span className="text-sm">{title}</span>
      </div>
    </button>
  )
}

export default QuickActionButton
