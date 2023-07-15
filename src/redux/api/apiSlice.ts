import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/books',
    }),
    singleProduct: builder.query({
      query: (id) => `/book/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useSingleProductQuery } = api;
