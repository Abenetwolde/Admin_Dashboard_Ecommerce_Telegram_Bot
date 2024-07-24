// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../redux/authSlice';


import categoryReducer from '../redux/categorySlice';
import productSlice from '../redux/productSlice';
import userSlice from '../redux/userSlice';
import orderSlice from '../redux/orderSlice';
import payment from '../redux/payment';
import { orderSliceApi } from '../redux/Api/Order';
import { authApiSlice } from '../redux/Api/Auth';
import { userApi } from '../redux/Api/User';
import { feedbackApiSlice } from '../redux/Api/feedback';
import { userKpiApi } from '../redux/Api/userKpiSlice';
import { paymentApi } from '../redux/Api/payment';
// import { orderSliceApi } from '../redux/Api/Order';

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categoryReducer,
    product:productSlice,
    user:userSlice, 
    order:orderSlice,
    payment:payment,
    [orderSliceApi.reducerPath]: orderSliceApi.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [feedbackApiSlice.reducerPath]: feedbackApiSlice.reducer,
    [userKpiApi.reducerPath]: userKpiApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },

   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(orderSliceApi.middleware,authApiSlice.middleware,userApi.middleware,feedbackApiSlice.middleware,userKpiApi.middleware , paymentApi.middleware),

});

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
