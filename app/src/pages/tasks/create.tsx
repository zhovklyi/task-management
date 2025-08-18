import React, { useState, useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import MainLayout from "@/layouts/main-layout"
import { PageHeader, Button, Card } from "@/components"
import { FormGroup, Input, Textarea, Select } from "@/components"
import type { TaskFormData } from "@/types/task"

const TaskCreatePage: React.FC = (): React.ReactElement => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

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
    // Set default project if provided in URL params
    const projectId = searchParams.get("project")
    if (projectId) {
      setFormData(prev => ({ ...prev, project_id: parseInt(projectId) }))
    }

    // Set default due date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateStr = tomorrow.toISOString().substring(0, 10)
    setFormData(prev => ({
      ...prev,
      due_date: dateStr
    }))
  }, [searchParams])

  const statusOptions = [
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
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

      // Navigate to tasks list
      navigate("/tasks")
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = (): void => {
    navigate("/tasks")
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Create New Task"
            description="Add a new task to track and manage your work"
          />
          <Link to="/tasks">
            <Button variant="secondary">Back to Tasks</Button>
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
                placeholder="Describe what needs to be done"
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
              <FormGroup label="Initial Status" htmlFor="status" required>
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
                {isLoading ? "Creating..." : "Create Task"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </MainLayout>
  )
}

export default TaskCreatePage
