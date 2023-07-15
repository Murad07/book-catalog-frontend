import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import bookReducer from './features/books/bookSlice';
import { api } from './api/apiSlice';
import { userApi } from './features/user/userApi';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    book: bookReducer,
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
