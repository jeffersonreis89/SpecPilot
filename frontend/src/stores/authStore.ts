import { create } from 'zustand'

interface AuthStore {
  token: string | null
  user: { id: string; email: string; name: string } | null
  login: (token: string, user: any) => void
  logout: () => void
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem('authToken'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  
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
