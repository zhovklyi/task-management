import type React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default'
  size?: 'sm' | 'md'
  className?: string
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ""
}) => {
  const baseClasses = "font-medium rounded-lg"

  const variantClasses = {
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    default: "bg-slate-100 text-slate-800"
  }

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm"
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
