import React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined
}

const Input: React.FC<InputProps> = ({ error, className = "", ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      {...props}
    />
  )
}

export default Input
