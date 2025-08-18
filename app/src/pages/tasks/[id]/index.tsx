import React from "react"
import { useParams, Link } from "react-router-dom"
import MainLayout from "@/layouts/main-layout"
import { PageHeader, Button, Card, Badge } from "@/components"
import type { Task } from "@/types/task"

const TaskViewPage: React.FC = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>()

  // Mock data - replace with actual API call
  const task: Task = {
    id: parseInt(id || "1"),
    title: "Implement user authentication",
    description: "Set up JWT authentication with refresh tokens and secure password handling for the web application. This includes implementing login/logout functionality, password reset, and user session management with proper security measures.",
    project_id: 1,
    project_name: "Project Alpha",
    due_date: "2024-12-15",
    status: "In Progress",
    priority: "High",
    created_at: "2024-08-15T10:00:00Z",
    updated_at: "2024-08-18T15:30:00Z"
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "To Do": return "bg-amber-500"
      case "In Progress": return "bg-blue-500"
      case "Completed": return "bg-emerald-500"
      case "On Hold": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "Low": return "bg-green-500"
      case "Medium": return "bg-yellow-500"
      case "High": return "bg-orange-500"
      case "Urgent": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const isOverdue = (): boolean => {
    const dueDate = new Date(task.due_date)
    const today = new Date()
    return dueDate < today && task.status !== "Completed"
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader
            title={task.title}
            description="Task details and progress tracking"
          />
          <div className="flex space-x-3">
            <Link to={`/tasks/${id}/edit`}>
              <Button variant="secondary">Edit Task</Button>
            </Link>
            <Link to="/tasks">
              <Button variant="secondary">Back to Tasks</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">{task.description}</p>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity & Comments</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">Task status updated to "In Progress"</p>
                      <p className="text-xs text-gray-500">2 hours ago by John Doe</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">Task created</p>
                      <p className="text-xs text-gray-500">3 days ago by Jane Smith</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <Badge variant="default" className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Priority</p>
                    <Badge variant="default" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Project</p>
                    <Link
                      to={`/projects/${task.project_id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {task.project_name}
                    </Link>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Due Date</p>
                    <p className={`text-gray-900 ${isOverdue() ? 'text-red-600 font-semibold' : ''}`}>
                      {formatDate(task.due_date)}
                      {isOverdue() && <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Overdue</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created</p>
                    <p className="text-gray-900">{formatDate(task.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Updated</p>
                    <p className="text-gray-900">{formatDate(task.updated_at)}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="primary" className="w-full">Mark as Complete</Button>
                  <Button variant="secondary" className="w-full">Add Comment</Button>
                  <Button variant="secondary" className="w-full">Change Status</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default TaskViewPage
