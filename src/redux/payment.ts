import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk } from '../store';

import { Payment } from '../types/Payment';

interface Category {
  _id: string;
  category: {
    name: string;
    icon: string;
  };
}

interface PaymentState {
  data: Payment[];
  loading: boolean;
  error: string | null;
  page: number;
  rowsPerPage: number;
  totalPages: number;
  totalRows: number;
}

const initialState: PaymentState = {
  page: 0,
  rowsPerPage: 10,
  totalRows: 0,
  totalPages: 0,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentPage(state, action) {
      state.page = action.payload;
  },
  setPaymentRowsPerPage(state, action) {
      state.rowsPerPage = action.payload;
  },
  setPaymentPaginationData(state, action) {
      state.totalRows = action.payload.totalRows;
      state.totalPages = action.payload.totalPages;
  },}
});

export const {

  setPaymentPage,
  setPaymentRowsPerPage,
  setPaymentPaginationData
} = paymentSlice.actions;

export default paymentSlice.reducer;

