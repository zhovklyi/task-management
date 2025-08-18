import type React from "react"
import { useNavigate } from "react-router-dom"
import MainLayout from "@/layouts/main-layout"
import { PageHeader, ProjectCard } from "@/components"

const ProjectsIndexPage: React.FC = (): React.ReactElement => {
  const navigate = useNavigate()

  const projects = [
    {
      id: 1,
      title: "Project Alpha",
      description: "A comprehensive task management system for teams with advanced features and analytics.",
      status: "Active",
      taskCount: 5,
      completionPercentage: 75,
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      iconBgColor: "bg-gradient-to-br from-emerald-500 to-teal-600"
    },
    {
      id: 2,
      title: "Project Beta",
      description: "Mobile app development for iOS and Android with cross-platform compatibility.",
      status: "In Progress",
      taskCount: 12,
      completionPercentage: 45,
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      iconBgColor: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    {
      id: 3,
      title: "Project Gamma",
      description: "Website redesign and optimization for better performance and user experience.",
      status: "Planning",
      taskCount: 8,
      completionPercentage: 20,
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      iconBgColor: "bg-gradient-to-br from-blue-500 to-indigo-600"
    }
  ]

  const handleNewProject = (): void => {
    // Navigate to create project page
    navigate('/projects/create')
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Projects"
          description="Manage and organize your project portfolio"
          action={{
            label: "+ New Project",
            onClick: handleNewProject,
            variant: "primary"
          }}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              status={project.status}
              taskCount={project.taskCount}
              completionPercentage={project.completionPercentage}
              icon={project.icon}
              iconBgColor={project.iconBgColor}
              onClick={() => navigate(`/projects/${project.id}`)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default ProjectsIndexPage
