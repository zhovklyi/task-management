import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

const Card: React.FC<CardProps> = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-slate-200/60 p-4 ${
        hover ? 'hover:shadow-lg transition-all duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
