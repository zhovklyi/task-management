export type Project = {
  id: number
  title: string
  description: string
  status: 'Active' | 'In Progress' | 'Planning' | 'Completed' | 'On Hold'
  task_count: number
  completion_percentage: number
  created_at: string
  updated_at: string
}

export type ProjectFormData = {
  title: string
  description: string
  status: Project['status']
}
