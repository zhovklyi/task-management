import axios, { AxiosError, type AxiosResponse } from "axios"
import Cookies from "js-cookie"

const TOKEN_KEY = 'Authorization'
const TOKEN_PREFIX = 'Bearer'

export const setAuthorization = (token: string | null): void => {
  if (!token) {
    removeAuthorization()
    return
  }

  axiosInstance.defaults.headers.common[TOKEN_KEY] = token.startsWith(TOKEN_PREFIX) ? token : `${TOKEN_PREFIX} ${token}`
  Cookies.set(TOKEN_KEY, token, { expires: 5 })
}

export const removeAuthorization = (): void => {
  delete axiosInstance.defaults.headers.common[TOKEN_KEY]
  Cookies.remove(TOKEN_KEY)
}

export const getAuthorization = (): string | undefined => {
  return Cookies.get(TOKEN_KEY)
}

const axiosInstance = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

const savedToken = getAuthorization()
if (savedToken) {
  setAuthorization(savedToken)
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthorization()

    if (token) {
      config.headers.Authorization = `${TOKEN_PREFIX} ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeAuthorization()
      return Promise.reject(error)
    }

    return Promise.reject(error?.response?.data || error)
  }
)

class APIClient {
  private baseURL = 'http://localhost:8000/api'

  private async handleRequest<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: unknown
  ): Promise<T> {
    const response = await axiosInstance({
      method,
      url: `${this.baseURL}${url}`,
      data
    })

    return response as T
  }

  get = <T>(url: string): Promise<T> => {
    return this.handleRequest<T>('get', url)
  }

  create = <T>(url: string, data: unknown): Promise<T> => {
    return this.handleRequest<T>('post', url, data)
  }

  update = <T>(url: string, data: unknown): Promise<T> => {
    return this.handleRequest<T>('patch', url, data)
  }

  delete = <T>(url: string, data?: unknown): Promise<T> => {
    return this.handleRequest<T>('delete', url, data)
  }
}

const api = new APIClient()

export { api, APIClient }