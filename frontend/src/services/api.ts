import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

type ApiErrorResponse = {
  message?: string | string[]
}

export type AuthUser = {
  id: string
  email: string
  name: string
}

export type AuthResponse = AuthUser & {
  accessToken: string
}

export type PostmanCollection = Record<string, unknown>

export type CollectionPayload = {
  name: string
  description?: string
  baseUrl?: string
  postmanData: PostmanCollection
}

export type CollectionSummary = {
  id: string
  name: string
  description?: string
  baseUrl?: string
  createdAt: string
  updatedAt: string
}

export type TestExecutionResult = {
  id: string
  requestName: string
  method: string
  url: string
  statusCode: number
  status: 'passed' | 'failed' | 'error'
  duration?: number
  errorMessage?: string
  executedAt: string
}

export type TestExecutionStats = {
  total: number
  passed: number
  failed: number
  error: number
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.message
    if (Array.isArray(message)) {
      return message.join(', ')
    }
    if (message) {
      return message
    }
  }

  return fallback
}

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/api/auth/login', { email, password }),
  register: (email: string, password: string, name: string) =>
    api.post<AuthResponse>('/api/auth/register', { email, password, name }),
  getProfile: () => api.get<AuthUser>('/api/auth/profile'),
}

export const collectionsApi = {
  create: (data: CollectionPayload) =>
    api.post<CollectionSummary>('/api/collections', data),
  getAll: () => api.get<CollectionSummary[]>('/api/collections'),
  getOne: (id: string) => api.get<CollectionSummary>(`/api/collections/${id}`),
  update: (id: string, data: Partial<CollectionPayload>) =>
    api.patch<CollectionSummary>(`/api/collections/${id}`, data),
  delete: (id: string) => api.delete(`/api/collections/${id}`),
}

export const testExecutionsApi = {
  execute: (collectionId: string) =>
    api.post<TestExecutionResult[]>('/api/test-executions/execute', { collectionId }),
  getHistory: (collectionId: string) =>
    api.get<TestExecutionResult[]>(`/api/test-executions/history/${collectionId}`),
  getStats: (collectionId: string) =>
    api.get<TestExecutionStats>(`/api/test-executions/stats/${collectionId}`),
}
