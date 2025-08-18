import type React from "react"
import { useNavigate } from "react-router-dom"
import MainLayout from "@/layouts/main-layout"
import { PageHeader, TaskCard, TaskFilters } from "@/components"

const TasksIndexPage: React.FC = (): React.ReactElement => {
  const navigate = useNavigate()

  const tasks = [
    {
      id: 1,
      title: "Implement user authentication",
      description: "Set up JWT authentication with refresh tokens and secure password handling for the web application.",
      project: "Project Alpha",
      dueDate: "Dec 15, 2024",
      status: "In Progress",
      priority: "High",
      statusColor: "bg-blue-500"
    },
    {
      id: 2,
      title: "Design mobile UI components",
      description: "Create reusable components for the mobile app with consistent design patterns and accessibility features.",
      project: "Project Beta",
      dueDate: "Dec 20, 2024",
      status: "To Do",
      priority: "Medium",
      statusColor: "bg-amber-500"
    },
    {
      id: 3,
      title: "Optimize website performance",
      description: "Improve loading speed and Core Web Vitals through code optimization and caching strategies.",
      project: "Project Gamma",
      dueDate: "Dec 25, 2024",
      status: "Completed",
      priority: "Low",
      statusColor: "bg-emerald-500"
    }
  ]

  const handleNewTask = (): void => {
    // Navigate to create task page
    navigate('/tasks/create')
  }

  const handleProjectChange = (value: string): void => {
    // @todo: Implement project filtering
    console.log('Project filter:', value)
  }

  const handleStatusChange = (value: string): void => {
    // @todo: Implement status filtering
    console.log('Status filter:', value)
  }

  const handlePriorityChange = (value: string): void => {
    // @todo: Implement priority filtering
    console.log('Priority filter:', value)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Tasks"
          description="Track and manage your project tasks efficiently"
          action={{
            label: "+ New Task",
            onClick: handleNewTask,
            variant: "primary"
          }}
        />

        <TaskFilters
          onProjectChange={handleProjectChange}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
        />

        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              project={task.project}
              dueDate={task.dueDate}
              status={task.status}
              priority={task.priority}
              statusColor={task.statusColor}
              onClick={() => navigate(`/tasks/${task.id}`)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default TasksIndexPage
