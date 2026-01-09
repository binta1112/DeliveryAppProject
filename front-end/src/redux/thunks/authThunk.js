
import AuthService from "../../services/AuthService";
import StorageService from "../../services/storageService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authThunk = createAsyncThunk(
    'auth/login',
    async ({email, password}, { rejectWithValue }) => {
       
        try {
            const response = await AuthService.login(email, password);
            if(response && response.accessToken && response.refreshToken){
                await StorageService.saveAccessToken(response.accessToken);
                await StorageService.saveRefreshToken(response.refreshToken);
                return response; 
            }
            return rejectWithValue("Invalid response from server");
            
        } catch (error) {
            return rejectWithValue(error.message || "Login failed");
        }   
    }
);