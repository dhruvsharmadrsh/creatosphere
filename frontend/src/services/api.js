import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API methods
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
  removeBackground: async (imageUrl) => {
    const response = await api.post('/ai/remove-bg', { image_url: imageUrl });
    return response.data;
  },

  // Test endpoints
  testUpload: async () => {
    const response = await api.get('/upload/test');
    return response.data;
  },
};

export default api;
