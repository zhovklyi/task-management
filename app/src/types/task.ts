export type Task = {
  id: number
  title: string
  description: string
  project_id: number
  project_name: string
  due_date: string
  status: 'To Do' | 'In Progress' | 'Completed' | 'On Hold'
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
  created_at: string
  updated_at: string
}

export type TaskFormData = {
  title: string
  description: string
  project_id: number
  due_date: string
  status: Task['status']
  priority: Task['priority']
}
