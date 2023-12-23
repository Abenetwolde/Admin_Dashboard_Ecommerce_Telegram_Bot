import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk } from '../store';
import { AppThunk } from '../app/store';
import {  getCategoryList } from '../services/category';

interface Category {
  _id: string;
  category: {
    name: string;
    icon: string;
  };
}

interface CategoryState {
  data: Category[];
  loading: boolean;
  error: string | null;
  page: number;
  rowsPerPage: number;
  totalPages: number;
  totalRows: number;
}

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: null,
  page: 0,
  rowsPerPage: 10,
  totalPages: 0,
  totalRows: 0,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    createCategorySuccess(state, action: PayloadAction<Category>) {
      state.data.unshift(action.payload);
      state.totalRows += 1;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<{ categorys: Category[]; count: number; page: number; pageSize: number; totalPages: number }>) {
      state.loading = false;
      state.data = action.payload.categorys;
      state.totalRows = action.payload.count;
      state.page = action.payload.page;
      state.rowsPerPage = action.payload.pageSize;
      state.totalPages = action.payload.totalPages;
    },
    updateCategorySuccess(state, action: PayloadAction<Category>) {
      const updatedCategory = action.payload;
      const index = state.data.findIndex((category) => category._id === updatedCategory._id);

      if (index !== -1) {
        state.data[index] = updatedCategory;
      }
    },
    deleteCategorySuccess(state, action: PayloadAction<string>) {
      // const deletedCategoryId = action.payload;
      const index = state.data.findIndex((category) => category._id === action.payload);

      // Remove the category from the array
      if (index !== -1) {
        state.data.splice(index, 1);
      }

      // Decrement the totalRows count
      state.totalRows -= 1;
    },
  
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
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
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  updateCategorySuccess,
  deleteCategorySuccess,
  createCategorySuccess,
  setPage,
  setRowsPerPage,
} = categorySlice.actions;

export default categorySlice.reducer;

export const fetchCategories = (): AppThunk => async (dispatch, getState) => {
  const { page, rowsPerPage } = getState().category;
  dispatch(fetchCategoriesStart());
  try {
    const categories = await getCategoryList(page, rowsPerPage);
    dispatch(fetchCategoriesSuccess({ ...categories, page, pageSize: rowsPerPage }));
  } catch (error) {
    dispatch(fetchCategoriesFailure( 'Failed to fetch categories'));
  }
};

export const setRowsPerPageAndFetch = (newRowsPerPage: number): AppThunk => async (dispatch) => {
  dispatch(setRowsPerPage(newRowsPerPage));
  dispatch(setPage(0));
  dispatch(fetchCategories());
};

export const setPageAndFetch = (newPage: number): AppThunk => async (dispatch) => {
  dispatch(setPage(newPage));
  dispatch(fetchCategories());
};
