import type React from "react"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="max-w-3xl mx-auto min-h-screen h-full">
        <main className="p-6">
          { children }
        </main>
      </div>
    </div>
  )
}

export default AuthLayout
