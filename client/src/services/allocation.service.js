import api from './api.js';

/**
 * Allocation Service
 * Frontend API call stubs — wired to backend in Task 2
 */

export const allocationService = {
  /** GET /api/allocations */
  getAll: (params = {}) => api.get('/allocations', { params }),

  /** GET /api/allocations/:id */
  getById: (id) => api.get(`/allocations/${id}`),

  /** POST /api/allocations */
  create: (data) => api.post('/allocations', data),

  /** PUT /api/allocations/:id */
  update: (id, data) => api.put(`/allocations/${id}`, data),

  /** POST /api/allocations/:id/return */
  returnAsset: (id, data) => api.post(`/allocations/${id}/return`, data),

  /** GET /api/allocations/history */
  getHistory: (params = {}) => api.get('/allocations/history', { params }),

  /** DELETE /api/allocations/:id */
  delete: (id) => api.delete(`/allocations/${id}`),
};

export default allocationService;
