import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: '/auth/login',
        method: 'POST',
        body: userData,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = userApi;
