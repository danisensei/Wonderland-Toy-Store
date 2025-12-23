import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        // Token expired or invalid - clear auth state
        localStorage.removeItem('authToken');
        // Optionally redirect to login
        // window.location.href = '/login';
      }
      // Extract error message from response
      const message = error.response.data?.detail || error.response.data?.message || 'An error occurred';
      error.message = message;
    } else if (error.request) {
      // Request made but no response received
      error.message = 'Unable to connect to server. Please check if the backend is running.';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

