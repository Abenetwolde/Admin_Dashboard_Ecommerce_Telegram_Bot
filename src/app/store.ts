// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import globalSlice from '../features/theam';
import { categoryApi } from '../api/categoryApi';
import { productApi } from '../api/productApi';
import categoryReducer from '../redux/categorySlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalSlice,
    category: categoryReducer,
    // [categoryApi.reducerPath]: categoryApi.reducer,
    // [productApi.reducerPath]: productApi.reducer, // Add the categoryApi reducer
    // Add other reducers as needed
  },

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(categoryApi.middleware, productApi.middleware),

});

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
