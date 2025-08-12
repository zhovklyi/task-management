import type React from "react"
import { useState } from "react"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout : React.FC<MainLayoutProps> = ({ children }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="max-w-7xl mx-auto min-h-screen">
        <nav>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-blue-800">
                Task Management
              </h1>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 transition-colors focus:outline-none"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-blue-200"
                    />
                    <span className="hidden md:block">{user.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>

                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Profile Settings
                      </a>

                      <button
                        onClick={() => {setIsProfileOpen(false)}}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="p-6">
          { children }
        </main>
      </div>
    </div>
  )
}

export default MainLayout