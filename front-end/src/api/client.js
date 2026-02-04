import axios from 'axios';
import StorageService from '../services/storageService';

export const api = axios.create({
  baseURL: 'http://192.168.1.102:3000/',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await StorageService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Erreur récupération token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor pour gérer les erreurs 401 (token expiré)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Token expiré ou invalide');
    }
    return Promise.reject(error);
  }
);