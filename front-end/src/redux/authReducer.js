import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = { 
    user: null, 
    loading: false, 
    error: null ,
    isloggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
    reducers: {
    LOGIN_START: (state) => {
      state.loading = true;
      state.error = null;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.loading = false;
        state.user = action.payload;
        state.isloggedIn = true;
    },
    LOGIN_ERROR: (state, action) => {
      state.loading = false;
        state.error = action.payload;
        state.isloggedIn = false;
    },
    LOGOUT: (state) => {
        state.user = null;
        state.isloggedIn = false;
    },
    RESET_ERROR: (state) => {
      state.error = null;
    },
  },
});

export const { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, RESET_ERROR } = authSlice.actions;
export default authSlice.reducer;