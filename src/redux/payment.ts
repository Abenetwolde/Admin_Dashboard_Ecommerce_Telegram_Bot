import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk } from '../store';
import { AppThunk } from '../app/store';
import { Payment } from '../types/Payment';
import { getOrderList } from '../services/order';
import { getPaymentList } from '../services/payment';
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
  data: [],
  loading: false,
  error: null,
  page: 0,
  rowsPerPage: 10,
  totalPages: 0,
  totalRows: 0,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    fetchPaymentStart(state) {
      state.loading = true;
      state.error = null;
    },
    createPaymentSuccess(state, action: PayloadAction<Payment>) {
      state.data.unshift(action.payload);
      state.totalRows += 1;
    },
    fetchPaymentSuccess(state, action: PayloadAction<{ payments: any; count: number; page: number; pageSize: number; totalPages: number }>) {
      state.loading = false;
      state.data = action.payload.payments;
      state.totalRows = action.payload.count;
      state.page = action.payload.page;
      state.rowsPerPage = action.payload.pageSize;
      state.totalPages = action.payload.totalPages;
    },
    updatePaymentSuccess(state, action: PayloadAction<Payment>) {
      const updatedCategory = action.payload;
      const index = state.data.findIndex((category) => category._id === updatedCategory._id);

      if (index !== -1) {
        state.data[index] = updatedCategory;
      }
    },
    deletePaymentSuccess(state, action: PayloadAction<string>) {
      // const deletedCategoryId = action.payload;
      const index = state.data.findIndex((category) => category._id === action.payload);

      // Remove the category from the array
      if (index !== -1) {
        state.data.splice(index, 1);
      }

      // Decrement the totalRows count
      state.totalRows -= 1;
    },
  
    fetchPaymentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
  },
});

export const {
  fetchPaymentStart,
  fetchPaymentSuccess,
  fetchPaymentFailure,
  updatePaymentSuccess,
  deletePaymentSuccess,
  createPaymentSuccess,
  setPage,
  setRowsPerPage,
} = paymentSlice.actions;

export default paymentSlice.reducer;

export const fetchPayment = (): AppThunk => async (dispatch, getState) => {
  const { page, rowsPerPage } = getState().payment;
  dispatch(fetchPaymentStart());
  try {
    const products = await getPaymentList(page, rowsPerPage);
    dispatch(fetchPaymentSuccess({ ...products, page, pageSize: rowsPerPage }));
  } catch (error) {
    dispatch(fetchPaymentFailure( 'Failed to fetch categories'));
  }
};

export const setRowsPerPageAndFetch = (newRowsPerPage: number): AppThunk => async (dispatch) => {
  dispatch(setRowsPerPage(newRowsPerPage));
  dispatch(setPage(0));
  dispatch(fetchPayment());
};

export const setPageAndFetch = (newPage: number): AppThunk => async (dispatch) => {
  dispatch(setPage(newPage));
  dispatch(fetchPayment());
};
