import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action) {
      const { name, email, password } = action.payload;
      const existingUser = state.users.find((user) => user.email === email);

      if (existingUser) {
        state.error = 'Bu e-posta zaten kayıtlı.';
        return;
      }

      state.users.push({ name, email, password });
      state.error = null;
    },
    login(state, action) {
      const { email, password } = action.payload;
      const user = state.users.find(
        (item) => item.email === email && item.password === password
      );

      if (!user) {
        state.currentUser = null;
        state.error = 'E-posta veya şifre hatalı.';
        return;
      }

      state.currentUser = { name: user.name, email: user.email };
      state.error = null;
    },
    logout(state) {
      state.currentUser = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
