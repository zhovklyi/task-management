import { api } from '@/apis/config'
import { type User } from '@/types/user'
import { type LoginData, type RegisterData, type AuthResponse } from '@/types/auth'
import { API_USER, API_REGISTER, API_LOGIN, API_LOGOUT } from '@/constants/url'

export const getUser = (): Promise<User> => api.get<User>(`${API_USER}`)

export const login = (data: LoginData): Promise<AuthResponse> => {
  return api.create<AuthResponse>(`${API_LOGIN}`, data)
}

export const register = (data: RegisterData): Promise<AuthResponse> => {
  return api.create<AuthResponse>(`${API_REGISTER}`, data)
}

export const logout = (): Promise<void> => api.create<void>(`${API_LOGOUT}`, {})