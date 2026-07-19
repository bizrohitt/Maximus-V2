'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { login as apiLogin, setToken, clearToken, isLoggedIn } from '@/lib/admin-api'

interface AuthContextType {
  authenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  login: async () => {},
  logout: () => {},
  loading: true,
})

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      setAuthenticated(isLoggedIn())
    } catch (e) {
      console.error('Auth check failed:', e)
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const { token } = await apiLogin(email, password)
    setToken(token)
    setAuthenticated(true)
  }

  const logout = () => {
    clearToken()
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAdminAuth() {
  return useContext(AuthContext)
}
