import React from "react"

interface FormGroupProps {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  error?: string
  className?: string
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = ""
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default FormGroup
