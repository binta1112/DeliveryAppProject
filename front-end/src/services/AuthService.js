import api from '../api/client';
const AuthService = {
    login: async (email, password) => {
         const response = await api.post('auth/login', {'email': email, 'password': password});
         return response.data;
    },
    register: async (email, password, name) => {
        //
    }
};

export default AuthService;