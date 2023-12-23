// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '../app/store';

// Create an async thunk for creating a product
export const createProduct = createAsyncThunk('products/create', async (productData) => {
  const response = await axios.post('http://localhost:5000/api/createproduct', productData);
  return response.data; // Assuming the server returns the created product
});

// Create a slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
