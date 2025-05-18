// src/lib/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './features/propertiesSlice';
import filterReducer from './features/filterSlice';
import authReducer from './features/authSlice';
import inquiriesReducer from './features/inquiriesSlice';
import uiReducer from './features/uiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      properties: propertiesReducer,
      filters: filterReducer,
      auth: authReducer,
      inquiries: inquiriesReducer,
      ui: uiReducer,
    },
  });
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];