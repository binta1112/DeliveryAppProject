import { useState } from "react";
import {login, loginFailed} from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import AuthService from "../services/AuthService";
import StorageService from "../services/storageService";
import SubscribeData from "../types/suscribeData";
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
            console.log("Login successful");
         }
      } catch (error) {
         dispatch(loginFailed());
         console.error("Login failed:", error);
      } finally {
         setIsloading(false);
      }
   };

   const Register = async (user:SubscribeData) => {
      console.log("Registering user dans hook:", user);
      try {
         setIsloading(true);
         const response = await AuthService.register(user);
         console.log("Registration successful dans hook:", response.data);
      } catch (error) {
         console.error("Registration failed:", error);
      } finally {
         setIsloading(false);
      }
   };

   return { Login, Register, isloading };
};

export default useAuth;