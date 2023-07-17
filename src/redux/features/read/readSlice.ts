import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IRead {
  books: IProduct[];
}

const initialState: IRead = {
  books: [],
};

const readSlice = createSlice({
  name: 'read',
  initialState,
  reducers: {
    addToRead: (state, action: PayloadAction<IProduct>) => {
      state.books.push({ ...action.payload });
    },
    removeFromRead: (state, action: PayloadAction<IProduct>) => {
      state.books = state.books.filter(
        (book) => book._id !== action.payload._id
      );
    },
    markAsFinished: (state, action: PayloadAction<IProduct>) => {
      const book = state.books.find((book) => book._id === action.payload._id);

      if (book) {
        book.isFinished = true;
      }
    },
  },
});

export const { addToRead, removeFromRead, markAsFinished } = readSlice.actions;

export default readSlice.reducer;
