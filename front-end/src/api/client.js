import axios from 'axios';
import StorageService from '../services/storageService';

export const api = axios.create({
  baseURL: 'http://192.168.1.102:3000/',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await StorageService.getAccessToken();

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Token expiré ou invalide');
    }
    return Promise.reject(error);
  }
);