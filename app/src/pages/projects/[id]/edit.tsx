import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import MainLayout from "@/layouts/main-layout"
import { PageHeader, Button, Card } from "@/components"
import { FormGroup, Input, Textarea, Select } from "@/components"
import type { Project, ProjectFormData } from "@/types/project"

const ProjectEditPage: React.FC = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    status: "Active"
  })

  const [errors, setErrors] = useState<Partial<ProjectFormData>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProject: Project = {
      id: parseInt(id || "1"),
      title: "Project Alpha",
      description: "A comprehensive task management system for teams with advanced features and analytics.",
      status: "Active",
      task_count: 5,
      completion_percentage: 75,
      created_at: "2024-08-15T10:00:00Z",
      updated_at: "2024-08-18T15:30:00Z"
    }

    setFormData({
      title: mockProject.title,
      description: mockProject.description,
      status: mockProject.status
    })
  }, [id])

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "In Progress", label: "In Progress" },
    { value: "Planning", label: "Planning" },
    { value: "Completed", label: "Completed" },
    { value: "On Hold", label: "On Hold" }
  ]

  const handleInputChange = (field: keyof ProjectFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ProjectFormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
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

      // Navigate back to project view
      navigate(`/projects/${id}`)
    } catch (error) {
      console.error("Error updating project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = (): void => {
    navigate(`/projects/${id}`)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Edit Project"
            description="Update project information and settings"
          />
          <Link to={`/projects/${id}`}>
            <Button variant="secondary">Back to Project</Button>
          </Link>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <FormGroup label="Project Title" htmlFor="title" required error={errors.title}>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("title", e.target.value)}
                placeholder="Enter project title"
                error={errors.title}
              />
            </FormGroup>

            <FormGroup label="Description" htmlFor="description" required error={errors.description}>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("description", e.target.value)}
                placeholder="Enter project description"
                error={errors.description}
              />
            </FormGroup>

            <FormGroup label="Status" htmlFor="status" required>
              <Select
                id="status"
                options={statusOptions}
                value={formData.status}
                onChange={(value: string) => handleInputChange("status", value)}
              />
            </FormGroup>

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
                {isLoading ? "Updating..." : "Update Project"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </MainLayout>
  )
}

export default ProjectEditPage
