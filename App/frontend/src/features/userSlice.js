// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching user profile information
// This is now a mock function that simulates a successful response from a backend.
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (userId, thunkAPI) => {
    // Simulates a delay like a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Simulated user data as if it were coming from a backend API
    const mockUserData = {
      id: userId,
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    // Return the simulated user data
    return mockUserData;
  }
);

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        state.status = 'succeeded';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;