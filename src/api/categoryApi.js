// categoryApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // Adjust the base URL
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "getcategorys",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
        }),
    }),
});
export const { useGetCategoriesQuery } = categoryApi;
