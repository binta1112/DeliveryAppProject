import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AuthService from '../services/AuthService';
import StorageService from '../services/storageService';
import { setAuthUser } from '../redux/slices/authSlice';

const useAuth = () => {
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();

  const Login = async (email, password) => {
    try {
      setIsloading(true);
      const response = await AuthService.login(email, password);

      if (response?.accessToken && response?.refreshToken) {
        await StorageService.saveAccessToken(response.accessToken);
        await StorageService.saveRefreshToken(response.refreshToken);

        dispatch(
          setAuthUser({
            role: response.userRole,
            userId: response.userId,
            commerceantId: response.commerceantId,
            livreurId: response.livreurId,
            firstTime: false,
          })
        );
        return response;
      }
    } finally {
      setIsloading(false);
    }
  };

  const Register = async (user) => {
    try {
      setIsloading(true);
      const response = await AuthService.register(user);
      return response;
    } finally {
      setIsloading(false);
    }
  };

  return { Login, Register, isloading };
};

export default useAuth;