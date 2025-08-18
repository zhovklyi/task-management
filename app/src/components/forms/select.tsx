import React from "react"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[]
  error?: string | undefined
  onChange: (value: string) => void
}

const Select: React.FC<SelectProps> = ({ options, error, onChange, className = "", ...props }) => {
  return (
    <select
      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
