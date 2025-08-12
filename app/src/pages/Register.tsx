import { useState } from "react"
import AuthLayout from "@/layouts/auth-layout"
import FormGroup from "@/components/FormGroup"

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Basic validation
    if (formData.password !== formData.passwordConfirmation) {
      setErrors({ passwordConfirmation: "Passwords do not match" })
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters" })
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Register attempt:", formData)
      setIsLoading(false)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      })
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
              />

              <FormGroup
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />

              <FormGroup
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                required
                error={errors.password}
              />

              <FormGroup
                label="Confirm Password"
                name="passwordConfirmation"
                type="password"
                value={formData.passwordConfirmation}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
                error={errors.passwordConfirmation}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
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
