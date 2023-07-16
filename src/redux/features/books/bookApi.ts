import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/books',
    }),
    singleProduct: builder.query({
      query: (id) => `/book/${id}`,
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
  useGetProductsQuery,
  //   usePostCommentMutation,
  useSingleProductQuery,
  useAddBookMutation,
} = bookApi;
