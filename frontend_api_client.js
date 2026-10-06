import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  const tenantId = parts.length > 2 ? parts[0] : (localStorage.getItem('tenantId') || 'tenant_a');
  
  config.headers['X-Tenant-ID'] = tenantId;
  return config;
}, (error) => Promise.reject(error));

export default api;