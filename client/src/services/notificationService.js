import api from './api.js'

export const notificationService = {
  getAll: async (page = 1) => {
    const res = await api.get(`/notifications?page=${page}`)
    return res.data.data
  },
  markRead: async (id) => {
    const res = await api.put(`/notifications/${id}/read`)
    return res.data.data
  },
  markAllRead: async () => {
    const res = await api.put('/notifications/read-all')
    return res.data.data
  },
  delete: async (id) => {
    const res = await api.delete(`/notifications/${id}`)
    return res.data.data
  },
}
