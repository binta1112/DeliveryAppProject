import { configureStore } from '@reduxjs/toolkit';
import commandesReducer from './slices/commandes.slice';
import clientsReducer from './slices/clients.slice';
import commerceantsReducer from './slices/commerceants.slice';
import rappelsReducer from './slices/rappels.slice';
import authReducer from './slices/authSlice';
export const store = configureStore({
  reducer: {
    commandes: commandesReducer,
    clients: clientsReducer,
    commerceants: commerceantsReducer,
    rappels: rappelsReducer,
    auth:authReducer,
  },
});