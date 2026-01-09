import { useState } from "react";
import {login, loginFailed} from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const useAuth = () => {
   const [isloading, setIsloading] = useState(false);
   const dispatch = useDispatch();

   const Login = async (email, password) => {
      try {
         setIsloading(true);
         const response = await AuthService.login(email, password);
         if(response && response.accessToken && response.refreshToken){
            await StorageService.saveAccessToken(response.accessToken);
            await StorageService.saveRefreshToken(response.refreshToken);
            dispatch(login()); //Mis a jour du state global (isLoggedIn = true)
         }
      } catch (error) {
         dispatch(loginFailed());
         console.error("Login failed:", error);
      } finally {
         setIsloading(false);
      }
   };

   const Register = async (email, password, name) => {
      try {
         setIsloading(true);
         const response = await LoginAPI.post('auth/register', {'email': email, 'password': password, 'name': name});
         console.log("Registration successful:", response.data);
      } catch (error) {
         console.error("Registration failed:", error);
      } finally {
         setIsloading(false);
      }
   };

   return { Login, Register, isloading };
};

export default useAuth;