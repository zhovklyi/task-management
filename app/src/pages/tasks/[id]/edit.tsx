import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import MainLayout from "@/layouts/main-layout"
import { PageHeader, Button, Card } from "@/components"
import { FormGroup, Input, Textarea, Select } from "@/components"
import type { Task, TaskFormData } from "@/types/task"

const TaskEditPage: React.FC = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    project_id: 1,
    due_date: "",
    status: "To Do",
    priority: "Medium"
  })

  const [errors, setErrors] = useState<Partial<TaskFormData>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Mock projects data - replace with actual API call
  const projects = [
    { id: 1, name: "Project Alpha" },
    { id: 2, name: "Project Beta" },
    { id: 3, name: "Project Gamma" }
  ]

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockTask: Task = {
      id: parseInt(id || "1"),
      title: "Implement user authentication",
      description: "Set up JWT authentication with refresh tokens and secure password handling for the web application.",
      project_id: 1,
      project_name: "Project Alpha",
      due_date: "2024-12-15",
      status: "In Progress",
      priority: "High",
      created_at: "2024-08-15T10:00:00Z",
      updated_at: "2024-08-18T15:30:00Z"
    }

    setFormData({
      title: mockTask.title,
      description: mockTask.description,
      project_id: mockTask.project_id,
      due_date: mockTask.due_date,
      status: mockTask.status,
      priority: mockTask.priority
    })
  }, [id])

  const statusOptions = [
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
    { value: "On Hold", label: "On Hold" }
  ]

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
    { value: "Urgent", label: "Urgent" }
  ]

  const projectOptions = projects.map(project => ({
    value: project.id.toString(),
    label: project.name
  }))

  const handleInputChange = (field: keyof TaskFormData, value: string | number): void => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<TaskFormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.due_date) {
      newErrors.due_date = "Due date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Navigate back to task view
      navigate(`/tasks/${id}`)
    } catch (error) {
      console.error("Error updating task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = (): void => {
    navigate(`/tasks/${id}`)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Edit Task"
            description="Update task information and settings"
          />
          <Link to={`/tasks/${id}`}>
            <Button variant="secondary">Back to Task</Button>
          </Link>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <FormGroup label="Task Title" htmlFor="title" required error={errors.title}>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("title", e.target.value)}
                placeholder="Enter task title"
                error={errors.title}
              />
            </FormGroup>

            <FormGroup label="Description" htmlFor="description" required error={errors.description}>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("description", e.target.value)}
                placeholder="Enter task description"
                error={errors.description}
              />
            </FormGroup>

            <div className="grid gap-6 md:grid-cols-2">
              <FormGroup label="Project" htmlFor="project" required>
                <Select
                  id="project"
                  options={projectOptions}
                  value={formData.project_id.toString()}
                  onChange={(value: string) => handleInputChange("project_id", parseInt(value))}
                />
              </FormGroup>

              <FormGroup label="Due Date" htmlFor="due_date" required error={errors.due_date}>
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("due_date", e.target.value)}
                  error={errors.due_date}
                />
              </FormGroup>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormGroup label="Status" htmlFor="status" required>
                <Select
                  id="status"
                  options={statusOptions}
                  value={formData.status}
                  onChange={(value: string) => handleInputChange("status", value)}
                />
              </FormGroup>

              <FormGroup label="Priority" htmlFor="priority" required>
                <Select
                  id="priority"
                  options={priorityOptions}
                  value={formData.priority}
                  onChange={(value: string) => handleInputChange("priority", value)}
                />
              </FormGroup>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Task"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </MainLayout>
  )
}

export default TaskEditPage
