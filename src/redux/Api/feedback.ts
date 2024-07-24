// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbackApiSlice = createApi({
  reducerPath: 'feedbackApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.DURL,
  }),
  endpoints: (builder) => ({
    getAllFeedBack: builder.query<any, void>({
      query: ({ page=0, limit=10, search='' }:any) => ({
        url: 'feedback/feedbacks/',
        params: { page, limit, search },
      }),
      providesTags: (result) =>
        result
          ? [...result?.feedbacks?.map(({ _id }) => ({ type: 'Feedback', id: _id } as const)), { type: 'Feedback', id: 'LIST' }]
          : [{ type: 'Feedback', id: 'LIST' }],
    }),
    getUpdateFeedbackStatus: builder.mutation({
      query: ({ id }) => ({
        url: `feedback/feedbacks/${id}/isRead`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: 'Feedback', id: _id }],
      // invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
    }),
    replyFeedback: builder.mutation({
      query: (data) => ({
        url: `feedback/feedbacks/reply/${data.id}`,
        method: 'POST',
        body: {reply:data.reply},
      }),
      invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
    }),
  }),
  tagTypes: ['Feedback'],
});

export const { useGetAllFeedBackQuery, useGetUpdateFeedbackStatusMutation, useReplyFeedbackMutation } = feedbackApiSlice;
