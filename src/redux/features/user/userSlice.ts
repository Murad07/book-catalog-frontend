import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  accessToken: string;
  isLogedIn: boolean;
}

const initialState: IUser = {
  accessToken: '',
  isLogedIn: localStorage.getItem('isAuthenticated') === 'true',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isLogedIn = true;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('accessToken', action.payload);
    },
    logoutUser: (state) => {
      state.accessToken = '';
      state.isLogedIn = false;
      localStorage.setItem('isAuthenticated', 'false');
      localStorage.setItem('accessToken', '');
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
