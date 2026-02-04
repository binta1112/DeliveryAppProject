import * as SecureStore from 'expo-secure-store';

const StorageService = {
  saveAccessToken: async (accessToken) => {
    try {
      await SecureStore.setItemAsync('access_token', accessToken);
    } catch (error) {
      console.log('Erreur sauvegarde access token:', error);
    }
  },
  getAccessToken: async () => {
    try {
      return await SecureStore.getItemAsync('access_token');
    } catch (error) {
      console.log('Erreur récupération access token:', error);
      return null;
    }
  },
  saveRefreshToken: async (refreshToken) => {
    try {
      await SecureStore.setItemAsync('refresh_token', refreshToken);
    } catch (error) {
      console.log('Erreur sauvegarde refresh token:', error);
    }
  },
  getRefreshToken: async () => {
    try {
      return await SecureStore.getItemAsync('refresh_token');
    } catch (error) {
      console.log('Erreur récupération refresh token:', error);
      return null;
    }
  },
  clearTokens: async () => {
    try {
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
    } catch (error) {
      console.log('Erreur suppression tokens:', error);
    }
  },
};

export default StorageService;