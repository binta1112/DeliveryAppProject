import { api } from '../api/client';
import SubscribeData from '../types/suscribeData';
const AuthService = {
    login: async (email, password) => {
         const response = await api.post('auth/login', {'email': email, 'password': password});
         console.log('Login response:', response.data);
         return response.data;
    },
    register: async (user:SubscribeData) => {
            const response =  await api.post('auth/signup', user);
            console.log('R************egistration response:', response.data);
            return response.data;
    }
};

export default AuthService;