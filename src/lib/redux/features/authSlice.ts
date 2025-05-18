/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/redux/features/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  loading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      
      // Set the default Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { token, user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    // Remove token from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    
    // Remove the Authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    return null;
  } catch (error) {
    return rejectWithValue('Logout failed');
  }
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState() as { auth: AuthState };
    if (!auth.token) return null;
    
    // Set the default Authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    
    const response = await axios.get('/api/auth/me');
    return { token: auth.token, user: response.data };
  } catch (error) {
    // If the token is invalid, clear it
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    delete axios.defaults.headers.common['Authorization'];
    return rejectWithValue('Authentication failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      })

      // Check auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.token = action.payload.token;
          state.user = action.payload.user;
        } else {
          state.token = null;
          state.user = null;
        }
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;