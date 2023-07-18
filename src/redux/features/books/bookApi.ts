import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (searchTerm) => `/books?pag=1&limit=100&searchTerm=${searchTerm}`,
    }),
    getTopBooks: builder.query({
      query: () => `/books?pag=1&limit=10`,
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['singlebook'],
    }),
    addBook: builder.mutation({
      query: ({ data, accessToken }) => ({
        url: `/books/create-book`,
        method: 'POST',
        headers: {
          authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
    editBook: builder.mutation({
      query: ({ mData, id, accessToken }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        headers: {
          authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: mData,
      }),
      invalidatesTags: ['singlebook'],
    }),
    deleteBook: builder.mutation({
      query: ({ id, accessToken }) => ({
        url: `/books/${id}`,
        method: 'DELETE',
        headers: {
          authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
    addReview: builder.mutation({
      query: ({ reviewData, accessToken }) => ({
        url: `/reviews`,
        method: 'POST',
        headers: {
          authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: reviewData,
      }),
    }),
    getReview: builder.query({
      query: (id) => `/reviews/${id}`,
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetTopBooksQuery,
  useAddReviewMutation,
  useSingleBookQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  useGetReviewQuery,
} = bookApi;
