import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CashResponse, CompletedOrdersResponse, TransactionResponse } from '../../types/order/order';

const baseURL = process.env.DURL;

export const orderSliceApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    console.log("token from the sate ",token)
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },}),
  tagTypes: ['ORDER'],
  endpoints: (builder) => ({
    getAllOrders: builder.query<any, { page: number; pageSize: number; orderNumber:number;orderStatus:string,sortOrder:string,paymentType:string,paymentStatus:string/* search : string; sortField: string;  sortOrder :string;  orderStatus :string;paymentType:string  */ }>({
      // query: () => '/order/getorders',
      query: ({ page = 1, pageSize = 10,orderNumber,orderStatus,sortOrder,paymentType,paymentStatus/*  search = '', sortField = 'createdAt', sortOrder = 'asc', orderStatus = '',paymentType='' */ }) => ({

        url: `/order/getorders`,
        params: {
          page,
          pageSize,
          orderNumber,
    //       search,
    //       sortField,
          sortOrder,
    orderStatus,
    paymentType,
    paymentStatus
        },
      }),
      providesTags: (result) =>
        result
          ? [...result?.orders?.map(({ _id }) => ({ type: 'ORDER', id: _id } as const)), { type: 'ORDER', id: 'LIST' }]
          : [{ type: 'ORDER', id: 'LIST' }],
    }),
    updateOrderById: builder.mutation<any, Partial<Order>>({
      query: (order) => ({
        url: `order/updateorderbyid/${order._id}`,
        method: 'PUT',
        body: order,
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: 'ORDER', id: _id }],
    }),

    getCompletedOrders: builder.query<CompletedOrdersResponse, void>({
      query: () => '/order/get-complated-order',
    }),
    getCancelOrders: builder.query<CompletedOrdersResponse, void>({
        query: () => '/order/get-cancel-order',
      }),
      getCashOrders: builder.query<CashResponse, void>({
        query: () => '/order/get-order-by-cash',
      }),
      getOnlineOrders: builder.query<CashResponse, void>({
        query: () => '/order/get-order-by-online',
      }),
      getTotalTransaction: builder.query<TransactionResponse, void>({
        query: () => '/order/get-total-transaction',
      }),
  }),
});

export const { useGetCompletedOrdersQuery,useGetCancelOrdersQuery, useGetCashOrdersQuery , useGetOnlineOrdersQuery ,useGetTotalTransactionQuery, useGetAllOrdersQuery ,useUpdateOrderByIdMutation} = orderSliceApi;
