import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from '../api/services';

export const signUp = createAsyncThunk('auth/signUp', async (userData) => {
  try {
    const response = await post('/api/users/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
  },
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
