import api from './api.js';

/**
 * Booking Service
 * Frontend API call stubs — wired to backend in Task 2
 */

export const bookingService = {
  /** GET /api/bookings */
  getAll: (params = {}) => api.get('/bookings', { params }),

  /** GET /api/bookings/:id */
  getById: (id) => api.get(`/bookings/${id}`),

  /** POST /api/bookings */
  create: (data) => api.post('/bookings', data),

  /** PUT /api/bookings/:id */
  update: (id, data) => api.put(`/bookings/${id}`, data),

  /** DELETE /api/bookings/:id (cancel) */
  cancel: (id) => api.delete(`/bookings/${id}`),
};

export default bookingService;
