import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (searchTerm) => `books?pag=1&limit=100&searchTerm=${searchTerm}`,
    }),
    singleProduct: builder.query({
      query: (id) => `/book/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useSingleProductQuery } = api;
