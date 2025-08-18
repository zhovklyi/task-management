import type React from "react"

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = "",
  onClick,
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = "font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-md",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300",
    danger: "bg-red-600 hover:bg-red-700 text-white hover:shadow-md"
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 rounded-lg",
    lg: "px-6 py-3 rounded-xl"
  }

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
