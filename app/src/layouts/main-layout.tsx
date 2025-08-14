import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useUserStore from "@/store/user-store"
import { useUserQuery } from "@/hooks/queries/auth"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }): React.ReactElement => {
  const navigate = useNavigate()
  const { user, isAuthenticated, setUser, logout } = useUserStore()

  const {
    data: authData,
    isLoading: authIsLoading,
    isSuccess: isAuthSuccess,
    isError: isAuthError
  } = useUserQuery()

  const [isProfileOpen, setIsProfileOpen] = useState(false)

  useEffect(() => {
    if (isAuthSuccess && authData) {
      setUser(authData)
    }
  }, [authData, isAuthSuccess, setUser])

  useEffect(() => {
    if (isAuthError) {
      logout()
      navigate('/login')
    }
  }, [isAuthError, logout, navigate])

  const handleLogout = (): void => {
    logout()
    setIsProfileOpen(false)
    navigate('/login')
  }

  if (authIsLoading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium text-gray-700">
              {!isAuthenticated ? 'Checking authentication...' : 'Loading user data...'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <></>
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
                    <div className="w-8 h-8 rounded-full border-2 border-blue-200 bg-blue-600 flex items-center justify-center text-white font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="hidden md:block">{user?.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>

                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Profile Settings
                      </a>

                      <button
                        onClick={handleLogout}
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