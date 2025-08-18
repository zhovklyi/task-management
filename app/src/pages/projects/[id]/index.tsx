import React from "react"
import { useParams, Link } from "react-router-dom"
import MainLayout from "@/layouts/main-layout"
import { PageHeader, Button, Card, Badge } from "@/components"
import type { Project } from "@/types/project"

const ProjectViewPage: React.FC = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>()

  // Mock data - replace with actual API call
  const project: Project = {
    id: parseInt(id || "1"),
    title: "Project Alpha",
    description: "A comprehensive task management system for teams with advanced features and analytics. This project aims to streamline workflow processes and improve team collaboration through intuitive task tracking and project management tools.",
    status: "Active",
    task_count: 5,
    completion_percentage: 75,
    created_at: "2024-08-15T10:00:00Z",
    updated_at: "2024-08-18T15:30:00Z"
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Active": return "bg-emerald-500"
      case "In Progress": return "bg-blue-500"
      case "Planning": return "bg-amber-500"
      case "Completed": return "bg-green-500"
      case "On Hold": return "bg-gray-500"
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader
            title={project.title}
            description="Project details and overview"
          />
          <div className="flex space-x-3">
            <Link to={`/projects/${id}/edit`}>
              <Button variant="secondary">Edit Project</Button>
            </Link>
            <Link to="/projects">
              <Button variant="secondary">Back to Projects</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Implement user authentication</p>
                      <p className="text-sm text-gray-600">Due: Dec 15, 2024</p>
                    </div>
                    <Badge variant="info">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Design database schema</p>
                      <p className="text-sm text-gray-600">Due: Dec 20, 2024</p>
                    </div>
                    <Badge variant="warning">To Do</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <Badge variant="default" className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tasks</p>
                    <p className="text-lg font-semibold text-gray-900">{project.task_count}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Completion</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${project.completion_percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{project.completion_percentage}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created</p>
                    <p className="text-gray-900">{formatDate(project.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Updated</p>
                    <p className="text-gray-900">{formatDate(project.updated_at)}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to={`/tasks/create?project=${project.id}`} className="block">
                    <Button variant="primary" className="w-full">Add New Task</Button>
                  </Link>
                  <Button variant="secondary" className="w-full">View All Tasks</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default ProjectViewPage
