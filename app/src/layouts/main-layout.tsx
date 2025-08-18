import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import useUserStore from "@/store/user-store"
import { useUserQuery, useLogoutMutation } from "@/hooks/queries/auth"
import toast from "react-hot-toast"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }): React.ReactElement => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, setUser, logout: clearUser } = useUserStore()

  const {
    data: authData,
    isLoading: authIsLoading,
    isSuccess: isAuthSuccess,
    isError: isAuthError
  } = useUserQuery()

  const logoutMutation = useLogoutMutation()

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isAuthSuccess && authData) {
      setUser(authData)
    }
  }, [authData, isAuthSuccess, setUser])

  useEffect(() => {
    if (isAuthError) {
      clearUser()
      navigate('/login')
    }
  }, [isAuthError, clearUser, navigate])

  const handleLogout = (): void => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Logged out successfully')
        clearUser()
        setIsProfileOpen(false)
        navigate('/login')
      },
      onError: () => {
        clearUser()
        setIsProfileOpen(false)
        navigate('/login')
      }
    })
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
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex min-h-screen">
        <div className="w-56 bg-white/80 backdrop-blur-sm shadow-lg border-r border-slate-200/60">
          <div className="p-4 border-b border-slate-200/60">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>

              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>

                <p className="text-xs text-slate-500">Management</p>
              </div>
            </div>
          </div>

          <nav className="p-3">
            <div className="space-y-1">
              <Link
                to="/"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  location.pathname === '/'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-md transition-all duration-200 ${
                  location.pathname === '/'
                    ? 'bg-white/20'
                    : 'bg-slate-100 group-hover:bg-blue-100'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                  </svg>
                </div>
                <span className="font-medium text-sm">Dashboard</span>
              </Link>

              <Link
                to="/projects"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  location.pathname === '/projects'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-md transition-all duration-200 ${
                  location.pathname === '/projects'
                    ? 'bg-white/20'
                    : 'bg-slate-100 group-hover:bg-blue-100'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span className="font-medium text-sm">Projects</span>
              </Link>

              <Link
                to="/tasks"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  location.pathname === '/tasks'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-md transition-all duration-200 ${
                  location.pathname === '/tasks'
                    ? 'bg-white/20'
                    : 'bg-slate-100 group-hover:bg-blue-100'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="font-medium text-sm">Tasks</span>
              </Link>
            </div>
          </nav>
        </div>

        <div className="flex-1">
          <header className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-slate-200/60">
            <div className="flex items-center justify-between px-6 py-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition-all duration-200 focus:outline-none p-2 rounded-lg hover:bg-slate-100"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-md">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="hidden md:block font-medium text-sm">{user?.name}</span>
                    <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-slate-200/60 backdrop-blur-sm">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                        <p className="text-xs text-slate-500">{user?.email}</p>
                      </div>

                      <a
                        href="/profile"
                        className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Profile Settings
                      </a>

                      <button
                        onClick={handleLogout}
                        disabled={logoutMutation.isPending}
                        className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {logoutMutation.isPending ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 border border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            <span>Logging out...</span>
                          </div>
                        ) : (
                          "Logout"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/90 backdrop-blur-sm border-t border-slate-200/60 px-4 py-3">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className={`transition-all duration-200 font-medium py-2 px-3 rounded-lg ${
                    location.pathname === '/'
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-500'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/projects"
                  className={`transition-all duration-200 font-medium py-2 px-3 rounded-lg ${
                    location.pathname === '/projects'
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-500'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  to="/tasks"
                  className={`transition-all duration-200 font-medium py-2 px-3 rounded-lg ${
                    location.pathname === '/tasks'
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-500'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tasks
                </Link>
              </div>
            </div>
          )}

          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default MainLayout