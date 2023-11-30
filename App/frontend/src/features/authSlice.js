import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storeToken, removeToken, isAuthenticated as checkIsAuthenticated, storeUser } from '../utils/auth';

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      const data = await response.json();
      console.log(data);
      storeToken(data.token); // Store the token
      storeUser(data.id); // Store the user details
      return data.user; // Assuming the response contains the user data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (registrationInfo, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationInfo),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
      return await response.json(); // Assuming successful registration returns user data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isAuthenticated: checkIsAuthenticated(), // Set based on token presence
  currentUser: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false; // Update authentication status
      state.currentUser = null;
      state.error = null;
      removeToken(); // Remove token from localStorage
    }
    // You might add more reducers here
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true; // User is authenticated
      state.currentUser = action.payload;
      state.error = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [registerUser.fulfilled]: (state) => {
      state.error = null;
      state.isAuthenticated = checkIsAuthenticated(); // Optional: Check authentication status after registration
      // Handle post-registration logic if needed
    },
    [registerUser.rejected]: (state, action) => {
      state.error = action.payload;
    },
    // Other extra reducers can be added here
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
