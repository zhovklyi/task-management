import type React from "react"
import MainLayout from "@/layouts/main-layout"
import useUserStore from "@/store/user-store"
import {
  PageHeader,
  StatCard,
  Card,
  RecentTaskItem,
  QuickActionButton
} from "@/components"

const Dashboard: React.FC = (): React.ReactElement => {
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
    { title: "Total Tasks", value: "24", change: "+12%", changeType: "increase" as const, icon: "📋" },
    { title: "Completed", value: "18", change: "+8%", changeType: "increase" as const, icon: "✅" },
    { title: "In Progress", value: "4", change: "-2%", changeType: "decrease" as const, icon: "🔄" },
    { title: "Overdue", value: "2", change: "+1", changeType: "increase" as const, icon: "⚠️" }
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title={`Welcome back, ${user?.name}! 👋`}
          description="Here's what's happening with your tasks today."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 overflow-hidden">
            <div className="p-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50">
              <h2 className="text-lg font-bold text-slate-800">Recent Tasks</h2>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <RecentTaskItem
                    key={task.id}
                    title={task.title}
                    dueDate={task.dueDate}
                    status={task.status}
                    priority={task.priority}
                  />
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <QuickActionButton
                  key={index}
                  title={action.title}
                  icon={action.icon}
                  color={action.color}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
