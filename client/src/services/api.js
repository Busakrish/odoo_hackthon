import axios from 'axios';

/**
 * Axios base instance
 * All API calls go through this instance for centralized config.
 */
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request Interceptor — attach JWT token ─────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('assetflow_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor — normalise errors ────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: redirect to login when auth is implemented
      localStorage.removeItem('assetflow_token');
    }
    return Promise.reject(error);
  }
);

export default api;
