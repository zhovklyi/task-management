import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: (() => void) | undefined
}

const Card: React.FC<CardProps> = ({ children, className = "", hover = true, onClick }) => {
  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-slate-200/60 p-4 ${
        hover ? 'hover:shadow-lg transition-all duration-200' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick || undefined}
    >
      {children}
    </div>
  )
}

export default Card
