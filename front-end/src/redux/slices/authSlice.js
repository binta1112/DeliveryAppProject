import {createSlice} from '@reduxjs/toolkit';
import {authThunk} from '../thunks/authThunk';
const initialState = {
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state,action) {
            state.isLoggedIn = true;
        },
        loginFailed(state,action) {
            state.isLoggedIn = false;
        },
        logout(state) {
            state.isLoggedIn = false;
        }
    },
    
    extraReducers: (builder) => {
        builder.addCase(authThunk.fulfilled, (state, action) => {
            state.isLoggedIn = true;
        });
        builder.addCase(authThunk.rejected, (state, action) => {
            state.isLoggedIn = false;
        });
        builder.addCase(authThunk.pending, (state, action) => {
            state.isLoggedIn = false;
        });
        
    }
})

export const {login, loginFailed, logout} = authSlice.actions;
export default authSlice.reducer;