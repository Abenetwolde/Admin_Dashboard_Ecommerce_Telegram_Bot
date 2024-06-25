// productApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // Adjust the base URL
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => ({
        url: 'createproduct',
        method: 'POST',
        body: productData,
      }),
    }),
  }),
});

export const { useCreateProductMutation } = productApi;
