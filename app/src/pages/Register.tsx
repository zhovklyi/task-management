import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthLayout from "@/layouts/auth-layout"
import FormGroup from "@/components/FormGroup"
import useUserStore from "@/store/user-store"
import { useRegisterMutation } from "@/hooks/queries/auth"
import { setAuthorization } from "@/apis/config"
import type { FC } from "react"

interface FormData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

interface ValidationErrors {
  [key: string]: string
}

const Register: FC = (): React.ReactElement => {
  const navigate = useNavigate()
  const { setUser } = useUserStore()
  const registerMutation = useRegisterMutation()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validateForm = (data: FormData): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    if (!data.name.trim()) {
      newErrors.name = "Full name is required"
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!data.password) {
      newErrors.password = "Password is required"
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!data.passwordConfirmation) {
      newErrors.passwordConfirmation = "Please confirm your password"
    } else if (data.password !== data.passwordConfirmation) {
      newErrors.passwordConfirmation = "Passwords do not match"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})

    registerMutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation
    }, {
      onSuccess: (registrationData) => {
        setUser(registrationData.user)
        setAuthorization(registrationData.token)
        navigate('/')
      }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({...formData, [e.target.name]: e.target.value})

    if (errors[e.target.name]) {
      setErrors({...errors, [e.target.name]: ""})
    }
  }

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-600">Sign up to get started with task management</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormGroup
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                {...(errors.name && { error: errors.name })}
              />

              <FormGroup
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                {...(errors.email && { error: errors.email })}
              />

              <FormGroup
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                required
                {...(errors.password && { error: errors.password })}
              />

              <FormGroup
                label="Confirm Password"
                name="passwordConfirmation"
                type="password"
                value={formData.passwordConfirmation}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
                {...(errors.passwordConfirmation && { error: errors.passwordConfirmation })}
              />

              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {registerMutation.isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Register

