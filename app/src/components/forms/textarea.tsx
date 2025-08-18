import React from "react"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | undefined
}

const Textarea: React.FC<TextareaProps> = ({ error, className = "", ...props }) => {
  return (
    <textarea
      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      rows={4}
      {...props}
    />
  )
}

export default Textarea
