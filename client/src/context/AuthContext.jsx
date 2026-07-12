import { createContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/authService.js'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authService.getMe()
        .then((data) => setUser(data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const { token, user } = await authService.login(email, password)
    localStorage.setItem('token', token)
    setUser(user)
    return user
  }, [])

  const signup = useCallback(async (name, email, password) => {
    const { token, user } = await authService.signup(name, email, password)
    localStorage.setItem('token', token)
    setUser(user)
    return user
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
