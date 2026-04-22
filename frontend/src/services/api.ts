import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add token to requests
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

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  register: (email: string, password: string, name: string) =>
    api.post('/api/auth/register', { email, password, name }),
  getProfile: () => api.get('/api/auth/profile'),
}

// Collections API
export const collectionsApi = {
  create: (data: any) => api.post('/api/collections', data),
  getAll: () => api.get('/api/collections'),
  getOne: (id: string) => api.get(`/api/collections/${id}`),
  update: (id: string, data: any) => api.patch(`/api/collections/${id}`, data),
  delete: (id: string) => api.delete(`/api/collections/${id}`),
}

// Test Executions API
export const testExecutionsApi = {
  execute: (collectionId: string) =>
    api.post('/api/test-executions/execute', { collectionId }),
  getHistory: (collectionId: string) =>
    api.get(`/api/test-executions/history/${collectionId}`),
  getStats: (collectionId: string) =>
    api.get(`/api/test-executions/stats/${collectionId}`),
}
