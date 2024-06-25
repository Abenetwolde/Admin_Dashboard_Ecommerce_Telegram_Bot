// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';


import categoryReducer from '../redux/categorySlice';
import productSlice from '../redux/productSlice';
import userSlice from '../redux/userSlice';
import orderSlice from '../redux/orderSlice';
import payment from '../redux/payment';

const store = configureStore({
  reducer: {
    auth: authReducer,
<<<<<<< HEAD
    category: categoryReducer,
    product:productSlice,
    user:userSlice, 
=======

    category: categoryReducer,
    product:productSlice,
    user:userSlice,
>>>>>>> origin/main
    order:orderSlice,
    payment:payment
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
