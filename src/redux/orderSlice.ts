import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk } from '../store';
import { AppThunk } from '../app/store';
import {  getCategoryList } from '../services/category';
import { getProductList } from '../services/product';
import { Product } from '../types/product';
import { Order } from '../types/order/order';
import { getOrderList } from '../services/order';
interface Category {
  _id: string;
  category: {
    name: string;
    icon: string;
  };
}

interface OrderState {
  data: Order[];
  loading: boolean;
  error: string | null;
  page: number;
  rowsPerPage: number;
  totalPages: number;
  totalRows: number;
}

const initialState: OrderState = {
  data: [],
  loading: false,
  error: null,
  page: 0,
  rowsPerPage: 10,
  totalPages: 0,
  totalRows: 0,
};

const orderSlice = createSlice({
  name: 'prodcut',
  initialState,
  reducers: {
    fetchOrderStart(state) {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess(state, action: PayloadAction<Order>) {
      state.data.unshift(action.payload);
      state.totalRows += 1;
    },
    fetchOrderSuccess(state, action: PayloadAction<{ orders: any; count: number; page: number; pageSize: number; totalPages: number }>) {
      state.loading = false;
      state.data = action.payload.orders;
      state.totalRows = action.payload.count;
      state.page = action.payload.page;
      state.rowsPerPage = action.payload.pageSize;
      state.totalPages = action.payload.totalPages;
    },
    updateOrderSuccess(state, action: PayloadAction<Order>) {
      const updatedCategory = action.payload;
      const index = state.data.findIndex((category) => category._id === updatedCategory._id);

      if (index !== -1) {
        state.data[index] = updatedCategory;
      }
    },
    deleteOrderSuccess(state, action: PayloadAction<string>) {
      // const deletedCategoryId = action.payload;
      const index = state.data.findIndex((category) => category._id === action.payload);

      // Remove the category from the array
      if (index !== -1) {
        state.data.splice(index, 1);
      }

      // Decrement the totalRows count
      state.totalRows -= 1;
    },
  
    fetchOrderFailure(state, action: PayloadAction<string>) {
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
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderFailure,
  updateOrderSuccess,
  deleteOrderSuccess,
  createOrderSuccess,
  setPage,
  setRowsPerPage,
} = orderSlice.actions;

export default orderSlice.reducer;

export const fetchOrder = (): AppThunk => async (dispatch, getState) => {
  const { page, rowsPerPage } = getState().product;
  dispatch(fetchOrderStart());
  try {
    const products = await getOrderList(page, rowsPerPage);
    dispatch(fetchOrderSuccess({ ...products, page, pageSize: rowsPerPage }));
  } catch (error) {
    dispatch(fetchOrderFailure( 'Failed to fetch categories'));
  }
};

export const setRowsPerPageAndFetch = (newRowsPerPage: number): AppThunk => async (dispatch) => {
  dispatch(setRowsPerPage(newRowsPerPage));
  dispatch(setPage(0));
  dispatch(fetchOrder());
};

export const setPageAndFetch = (newPage: number): AppThunk => async (dispatch) => {
  dispatch(setPage(newPage));
  dispatch(fetchOrder());
};
