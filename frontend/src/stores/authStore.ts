import { create } from 'zustand'
import type { AuthUser } from '../services/api'

interface AuthStore {
  token: string | null
  user: AuthUser | null
  login: (token: string, user: AuthUser) => void
  logout: () => void
  setToken: (token: string) => void
}

const storedUser = localStorage.getItem('user')

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem('authToken'),
  user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,

  login: (token, user) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ token, user })
  },

  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    set({ token: null, user: null })
  },

  setToken: (token) => {
    localStorage.setItem('authToken', token)
    set({ token })
  },
}))
