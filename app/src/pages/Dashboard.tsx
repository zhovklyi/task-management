import MainLayout from "../layouts/main-layout"
import useUserStore from "@/store/user-store"
import type { FC } from "react"

const Dashboard: FC = (): React.ReactElement => {
  const { user } = useUserStore()

  // Safety check - ensure user has required data
  if (!user?.name || !user?.email) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading user data...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  const stats = [
    { title: "Total Tasks", value: "24", change: "+12%", changeType: "increase", icon: "📋" },
    { title: "Completed", value: "18", change: "+8%", changeType: "increase", icon: "✅" },
    { title: "In Progress", value: "4", change: "-2%", changeType: "decrease", icon: "🔄" },
    { title: "Overdue", value: "2", change: "+1", changeType: "increase", icon: "⚠️" }
  ]

  const recentTasks = [
    { id: 1, title: "Review project proposal", status: "completed", priority: "high", dueDate: "2024-01-15" },
    { id: 2, title: "Update documentation", status: "in-progress", priority: "medium", dueDate: "2024-01-18" },
    { id: 3, title: "Team meeting preparation", status: "pending", priority: "low", dueDate: "2024-01-20" },
    { id: 4, title: "Bug fixes for v2.1", status: "in-progress", priority: "high", dueDate: "2024-01-22" }
  ]

  const quickActions = [
    { title: "Create New Task", icon: "➕", action: "create", color: "bg-blue-500 hover:bg-blue-600" },
    { title: "View Calendar", icon: "📅", action: "calendar", color: "bg-green-500 hover:bg-green-600" },
    { title: "Team Overview", icon: "👥", action: "team", color: "bg-purple-500 hover:bg-purple-600" },
    { title: "Reports", icon: "📊", action: "reports", color: "bg-orange-500 hover:bg-orange-600" }
  ]

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Here's what's happening with your tasks today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last week</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`w-full ${action.color} text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2`}
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span>{action.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
