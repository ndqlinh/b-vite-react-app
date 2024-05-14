import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './users/userSlice';
import authReducer from '../../app/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
