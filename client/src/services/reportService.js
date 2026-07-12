import api from './api.js'

export const reportService = {
  getAssetUtilization: async () => {
    const res = await api.get('/reports/asset-utilization')
    return res.data.data
  },
  getMaintenanceFrequency: async () => {
    const res = await api.get('/reports/maintenance-frequency')
    return res.data.data
  },
  getDepartmentAllocation: async () => {
    const res = await api.get('/reports/department-allocation')
    return res.data.data
  },
  getBookingHeatmap: async () => {
    const res = await api.get('/reports/booking-heatmap')
    return res.data.data
  },
  getRetirementDue: async () => {
    const res = await api.get('/reports/retirement-due')
    return res.data.data
  },
}
