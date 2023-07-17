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
      query: ({ data, id, accessToken }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        headers: {
          authorization: `${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: data,
      }),
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
    // postComment: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/comment/${id}`,
    //     method: 'POST',
    //     body: data,
    //   }),
    //   invalidatesTags: ['comments'],
    // }),
    // getComment: builder.query({
    //   query: (id) => `/comment/${id}`,
    //   providesTags: ['comments'],
    // }),
  }),
});

export const {
  //   useGetCommentQuery,
  useGetBooksQuery,
  useGetTopBooksQuery,
  useAddReviewMutation,
  useSingleBookQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
