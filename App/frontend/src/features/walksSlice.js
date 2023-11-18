import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../utils/auth';

// Fetch all walks
export const fetchWalks = createAsyncThunk(
  'walks/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/walks', {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch walks');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a new walk
export const createWalk = createAsyncThunk(
  'walks/create',
  async (walkData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/walks', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(walkData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create walk');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update a walk
export const updateWalk = createAsyncThunk(
  'walks/update',
  async ({ walkId, walkData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/walks/${walkId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(walkData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update walk');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete a walk
export const deleteWalk = createAsyncThunk(
  'walks/delete',
  async (walkId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/walks/${walkId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message | 'Failed to delete walk');
      }
      return walkId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  walks: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const walksSlice = createSlice({
  name: 'walks',
  initialState,
  reducers: {
    // Reducers if necessary
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWalks.fulfilled, (state, action) => {
        state.walks = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchWalks.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(createWalk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createWalk.fulfilled, (state, action) => {
        state.walks.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createWalk.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(updateWalk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateWalk.fulfilled, (state, action) => {
        state.walks = state.walks.map(walk => 
          walk.id === action.payload.id ? action.payload : walk);
        state.status = 'succeeded';
      })
      .addCase(updateWalk.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(deleteWalk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteWalk.fulfilled, (state, action) => {
        state.walks = state.walks.filter(walk => walk.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteWalk.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default walksSlice.reducer;
