// src/redux/Api/User.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  _id: string;
  telegramid: string;
  first_name: string;
  last_name: string;
  username: string;
  language: string;
  is_bot: string;
  token: string;
  refreshToken: string;
}

interface PaginatedResponse<T> {
  users: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
interface UserPerformance {
  user: {
    user: {
      telegramid: string;
      first_name: string;
      last_name: string;
    };
    timeSpent: number;
    totalClicks: number;
    totalOrders: number;
  };
  timeSpent: number;
  totalClicks: number;
  totalOrders: number;
  overallScore: string;
}

interface UserPerformanceResponse {
  totalRows: number;
  page: number;
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  users: UserPerformance[];
}

interface UserClick {
  telegramid: string;
  userinformationperScene: { sceneName: string; totalClicks: number }[];
  totalClicks: number;
  userInformation: {
    _id: string;
    telegramid: string;
    username: string;
    first_name: string;
  };
}

interface UserClickResponse {
  clicksPerScene: UserClick[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
interface UserTime {
  _id: string;
  scenes: { sceneName: string; totalDuration: number }[];
  totalSpentTimeInMinutes: number;
  user: {
    _id: string;
    telegramid: string;
    username: string;
    first_name: string;
  };
}

interface UserTimeResponse {
  timeSpentPerScene: UserTime[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.DURL ,    prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    console.log("token from the sate ",token)
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },}),
  
  tagTypes: ['Payment'],
  endpoints: (builder) => ({

  
//    updateUser: builder.mutation<any, Partial<any>>({
//       query: (userData) => ({
//         url: `user/updateuser/${userData._id}`,
//         method: 'PUT',
//         body: userData,
//       }),
//       invalidatesTags: (result, error, { _id }) => [{ type: 'User', id: _id }],
//     }),
    getPayments:  builder.query<PaginatedResponse<User>, { page: number; pageSize: number; orderStatus : string; paymentType : string; sortField: string;  sortOrder :string;  paymentStatus :string;  }>({
      query: ({ page = 1, pageSize = 10,sortOrder,paymentType,orderStatus,paymentStatus }) => ({
        url: `payment/getallpayments`,
        params: {
          page,
          pageSize,
          sortOrder,
     
          orderStatus,
          paymentType,
          paymentStatus
        
        },
      }),
      providesTags: (result) =>
        result
          ? [...result?.payments?.map(({ _id }) => ({ type: 'Payment', id: _id } as const)), { type: 'Payment', id: 'LIST' }]
          : [{ type: 'Payment', id: 'LIST' }],
    }),
  
  }),
});

export const {
  useGetPaymentsQuery,

} = paymentApi;
