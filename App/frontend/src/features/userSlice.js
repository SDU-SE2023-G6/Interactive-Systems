import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken, getUser } from '../utils/auth';

// Fetch user details
export const fetchUserDetails = createAsyncThunk(
  'user/fetchDetails',
  async ({ rejectWithValue }) => {
    try {
      const userId = getUser();
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch user details');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update user details
export const updateUserDetails = createAsyncThunk(
  'user/updateDetails',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update user details');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

async function fetchUser() {
  const userId = getUser();
  if (!userId) return null;
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user details');
    }
    return await response.json().user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const initialState = {
  currentUser: await fetchUser(),
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.currentUser = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.status = 'succeeded';
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.status = 'succeeded';
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;