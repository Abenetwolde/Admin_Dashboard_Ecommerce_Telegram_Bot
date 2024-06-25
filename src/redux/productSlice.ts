import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk } from '../store';
import { AppThunk } from '../app/store';
import {  getCategoryList } from '../services/category';
import { getProductList } from '../services/product';
import { Product } from '../types/product';
interface Category {
  _id: string;
  category: {
    name: string;
    icon: string;
  };
}

interface ProdcutState {
  data: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  rowsPerPage: number;
  totalPages: number;
  totalRows: number;
}

const initialState: ProdcutState = {
  data: [],
  loading: false,
  error: null,
  page: 0,
  rowsPerPage: 10,
  totalPages: 0,
  totalRows: 0,
};

const productSlice = createSlice({
  name: 'prodcut',
  initialState,
  reducers: {
    fetchProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    createProductSuccess(state, action: PayloadAction<Product>) {
      state.data.unshift(action.payload);
      state.totalRows += 1;
    },
    fetchProductSuccess(state, action: PayloadAction<{ products: any; count: number; page: number; pageSize: number; totalPages: number }>) {
      state.loading = false;
      state.data = action.payload.products;
      state.totalRows = action.payload.count;
      state.page = action.payload.page;
      state.rowsPerPage = action.payload.pageSize;
      state.totalPages = action.payload.totalPages;
    },
    updateProductSuccess(state, action: PayloadAction<Product>) {
      const updatedCategory = action.payload;
      const index = state.data.findIndex((category) => category._id === updatedCategory._id);

      if (index !== -1) {
        state.data[index] = updatedCategory;
      }
    },
    deleteProductSuccess(state, action: PayloadAction<string>) {
      // const deletedCategoryId = action.payload;
      const index = state.data.findIndex((category) => category._id === action.payload);

      // Remove the category from the array
      if (index !== -1) {
        state.data.splice(index, 1);
      }

      // Decrement the totalRows count
      state.totalRows -= 1;
    },
  
    fetchProductFailure(state, action: PayloadAction<string>) {
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
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
  updateProductSuccess,
  deleteProductSuccess,
  createProductSuccess,
  setPage,
  setRowsPerPage,
} = productSlice.actions;

export default productSlice.reducer;

export const fetchProduct = (): AppThunk => async (dispatch, getState) => {
  const { page, rowsPerPage } = getState().product;
  dispatch(fetchProductStart());
  try {
    const products = await getProductList(page, rowsPerPage);
    dispatch(fetchProductSuccess({ ...products, page, pageSize: rowsPerPage }));
  } catch (error) {
    dispatch(fetchProductFailure( 'Failed to fetch categories'));
  }
};

export const setRowsPerPageAndFetch = (newRowsPerPage: number): AppThunk => async (dispatch) => {
  dispatch(setRowsPerPage(newRowsPerPage));
  dispatch(setPage(0));
  dispatch(fetchProduct());
};

export const setPageAndFetch = (newPage: number): AppThunk => async (dispatch) => {
  dispatch(setPage(newPage));
  dispatch(fetchProduct());
};
