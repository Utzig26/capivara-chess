import { configureStore } from '@reduxjs/toolkit'
import appSlice from './app.slice';
import authSlice from './auth.slice';

const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
  }
})

export default store;
