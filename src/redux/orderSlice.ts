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

const initialState: any = {
  page: 0,
  rowsPerPage: 10,
  totalRows: 0,
  totalPages: 0,
};

const orderSlice = createSlice({
  name: 'prodcut',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
  },
  setRowsPerPage(state, action) {
      state.rowsPerPage = action.payload;
  },
  setPaginationData(state, action) {
      state.totalRows = action.payload.totalRows;
      state.totalPages = action.payload.totalPages;
  },}
});

export const {

  setPage,
  setRowsPerPage,
  setPaginationData
} = orderSlice.actions;

export default orderSlice.reducer;

// export const fetchOrder = (): AppThunk => async (dispatch, getState) => {
//   const { page, rowsPerPage } = getState().product;
//   dispatch(fetchOrderStart());
//   try {
//     const products = await getOrderList(page, rowsPerPage);
//     dispatch(fetchOrderSuccess({ ...products, page, pageSize: rowsPerPage }));
//   } catch (error) {
//     dispatch(fetchOrderFailure( 'Failed to fetch categories'));
//   }
// };

// export const setRowsPerPageAndFetch = (newRowsPerPage: number): AppThunk => async (dispatch) => {
//   dispatch(setRowsPerPage(newRowsPerPage));
//   dispatch(setPage(0));
//   dispatch(fetchOrder());
// };

// export const setPageAndFetch = (newPage: number): AppThunk => async (dispatch) => {
//   dispatch(setPage(newPage));
//   dispatch(fetchOrder());
// };
