import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('gigar_token')
    const saved = localStorage.getItem('gigar_user')
    if (token && saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        localStorage.removeItem('gigar_token')
        localStorage.removeItem('gigar_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { data } = await authApi.login(email, password)
    localStorage.setItem('gigar_token', data.token)
    localStorage.setItem('gigar_user', JSON.stringify(data.user))
    setUser(data.user)
    return data
  }

  const logout = async () => {
    try { await authApi.logout() } catch {}
    localStorage.removeItem('gigar_token')
    localStorage.removeItem('gigar_user')
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, isAdmin: user?.role === 'admin', login, logout, loading }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
