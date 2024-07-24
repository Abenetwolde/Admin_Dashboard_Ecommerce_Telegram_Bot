// redux/slices/userKpiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useGetUserClicksQuery } from './User';

export const userKpiApi = createApi({
  reducerPath: 'userKpiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.DURL, prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log("token from the sate ", token)
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserRange: builder.mutation({
      query: ({ startDate, endDate }) => ({
        url: 'user/getuserrange',
        method: 'POST',
        body: { startDate, endDate },
      }),
    }),
    getNewUser: builder.query({
      query: (interval) => `user/getnewuser?interval=${interval}`,
    }),
    getUserRegistrationCard: builder.query({
      query: () => `/kpi/get-user-stats`,
    }),
    getUserTimeSpentCard: builder.query({
      query: () => `/kpi/get-user-time-spent-month`,
    }),
    getUserCLickCard: builder.query({
      query: () => `/kpi/get-user-time-click-month`,
    }),
    getLanguageStats: builder.query({
      query: () => 'user/language-stats',
    }),
    getPerformance: builder.query<any, any>({
      query: ({ page = 1, limit = 10, search = '', interval = 'perMonth' }) => ({
        url: `/kpi/get-users-performance`,
        params: {
          page,
          limit,
          search,
          interval
        },
      }),
    }),
    getUserSpentTimeRange: builder.mutation({
      query: ({ startDate, endDate }) => ({
        url: 'kpi/get-user-spent-range',
        method: 'GET',
        body: { startDate, endDate },
      }),
    }),
    getUserSpentTimeInterval: builder.query({
      query: (interval) => `kpi/get-user-spent-time?interval=${interval}`,
    }),
    getUserJoinedByMethod: builder.query({
      query: () => 'kpi/get-user-joined-by-method',
    }),
    getUserClcik: builder.query({
      query: (filter) => `kpi/get-user-clicks?interval=${filter}`,
    }),
    getTimePerScene: builder.query({
      query: (filter) => `/kpi/get-user-spent-per-scene-name?interval=${filter} `,
    }),

  }),
});

export const { useGetUserRangeMutation,
  useGetNewUserQuery, useGetUserRegistrationCardQuery, useGetUserTimeSpentCardQuery, useGetUserCLickCardQuery, useGetLanguageStatsQuery, useGetPerformanceQuery, useGetUserSpentTimeRangeMutation, useGetUserSpentTimeIntervalQuery, useGetUserJoinedByMethodQuery,useGetUserClcikQuery, useGetTimePerSceneQuery
} = userKpiApi;
