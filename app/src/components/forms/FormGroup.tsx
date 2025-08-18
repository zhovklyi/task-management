import React from "react"

export interface FormGroupProps {
  label: string
  htmlFor: string
  required?: boolean
  children: React.ReactNode
  error?: string | undefined
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  htmlFor,
  required = false,
  children,
  error
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default FormGroup
