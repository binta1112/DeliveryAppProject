//import * as SecureStore from 'expo-secure-store';

const StorageService = {
    saveAccessToken: async (accessToken) => {
        //await SecureStore.setItemAsync('access_token', accessToken);
    },
    getAccessToken: async () => {
        //return await SecureStore.getItemAsync('access_token');
    },
    saveRefreshToken: async (refreshToken) => {
        //await SecureStore.setItemAsync('refresh_token', refreshToken);
    },
    getRefreshToken: async () => {
        //return await SecureStore.getItemAsync('refresh_token');
    },
}
export default StorageService;