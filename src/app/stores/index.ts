import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../../app/principal/principalSlice'
import authReducer from '../../app/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
