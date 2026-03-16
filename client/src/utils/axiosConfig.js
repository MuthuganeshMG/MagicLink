import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3597/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - ONLY show message, DON'T auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't auto logout on 401 errors
    if (error.response?.status === 401) {
      // Just log the error, don't logout automatically
      console.log('Session expired message:', error.response?.data?.message);
      
      // You can show a toast/notification here if you want
      // but DON'T remove token or redirect automatically
      
      // Optionally, you can store that session expired for UI notification
      // but don't force logout
      sessionStorage.setItem('session_expired', 'true');
    }
    return Promise.reject(error);
  }
);

export default api;