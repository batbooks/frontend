// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,         // Can be { username, email, etc. }
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

export const infoSlice = createSlice({
  name: 'login_info',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logout } = infoSlice.actions;
export default infoSlice.reducer;