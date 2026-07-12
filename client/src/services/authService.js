import api from './api.js'

export const authService = {
  signup: async (name, email, password) => {
    const res = await api.post('/auth/signup', { name, email, password })
    return res.data.data
  },
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    return res.data.data
  },
  getMe: async () => {
    const res = await api.get('/auth/me')
    return res.data.data
  },
}
