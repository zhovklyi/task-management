import { type User } from '@/types/user'

export type LoginData = {
  email: string
  password: string
}

export type RegisterData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type AuthResponse = {
  token: string
  user: User
}