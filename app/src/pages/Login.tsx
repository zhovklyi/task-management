import React, { useEffect, useState } from "react"
import AuthLayout from "@/layouts/auth-layout"
import FormGroup from "@/components/FormGroup"
import type { FC } from "react"
import { useLoginMutation } from "@/hooks/queries/auth"
import useUserStore from "@/store/user-store"
import { useNavigate } from "react-router-dom"
import { setAuthorization } from "@/apis/config"

const Login: FC = (): React.ReactElement => {
  const navigate = useNavigate()
  const { setUser } = useUserStore()
  const loginMutation = useLoginMutation()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
    }, {
      onSuccess: (loginData) => {
        setUser(loginData.user)
        setAuthorization(loginData.token)
        navigate('/')
      }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
                required
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />

                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login
