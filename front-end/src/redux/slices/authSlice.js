import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  role: null,
  userId: null,
  commerceantId: null,
  livreurId: null,
  firstTime: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      const { role, userId, commerceantId, livreurId, firstTime = false } = action.payload || {};
      state.isLoggedIn = true;
      state.role = role || null;
      state.userId = userId || null;
      state.commerceantId = commerceantId || null;
      state.livreurId = livreurId || null;
      state.firstTime = !!firstTime;
    },
    completeFirstTime(state) {
      state.firstTime = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.role = null;
      state.userId = null;
      state.commerceantId = null;
      state.livreurId = null;
      state.firstTime = false;
    },
  },
});

export const { setAuthUser, completeFirstTime, logout } = authSlice.actions;
export default authSlice.reducer;