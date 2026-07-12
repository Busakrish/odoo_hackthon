import api from './api.js'

export const dashboardService = {
  getKPIs: async () => {
    const res = await api.get('/dashboard/kpis')
    return res.data.data
  },
  getOverdue: async () => {
    const res = await api.get('/dashboard/overdue')
    return res.data.data
  },
  getRecentActivity: async () => {
    const res = await api.get('/dashboard/recent-activity')
    return res.data.data
  },
}
