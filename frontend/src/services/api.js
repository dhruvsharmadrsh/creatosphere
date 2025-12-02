import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Upload file
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Remove background
  removeBackground: async (filename) => {
    const response = await api.post('/ai/remove-bg', { filename });
    return response.data;
  },

  // Generate background
  generateBackground: async (prompt) => {
    const response = await api.post('/ai/generate-bg', { preset: prompt });
    return response.data;
  },

  // Test endpoints
  testUpload: async () => {
    const response = await api.get('/upload/test');
    return response.data;
  },
};

export default api;
