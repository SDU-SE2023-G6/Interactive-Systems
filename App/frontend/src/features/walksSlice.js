import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../utils/auth';

// Async thunk to fetch walks
export const fetchWalks = createAsyncThunk(
  'walks/fetchWalks',
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

// Async thunk to create a new walk
export const createWalk = createAsyncThunk(
  'walks/createWalk',
  async (newWalk, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/walks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(newWalk),
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

// Async thunk to update a walk
export const updateWalk = createAsyncThunk(
  'walks/updateWalk',
  async ({ id, updatedWalk }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/walks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedWalk),
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

// Async thunk to delete a walk
export const deleteWalk = createAsyncThunk(
  'walks/deleteWalk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/walks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete walk');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to book a walk
export const bookWalk = createAsyncThunk(
  'walks/bookWalk',
  async (walkDetails, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/walks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(walkDetails),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to book walk');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  walks: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const walkSlice = createSlice({
  name: 'walks',
  initialState,
  reducers: {},
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
      })
      .addCase(bookWalk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bookWalk.fulfilled, (state, action) => {
        state.walks.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(bookWalk.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default walkSlice.reducer;
