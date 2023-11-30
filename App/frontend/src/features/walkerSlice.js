import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch walkers
export const fetchWalkers = createAsyncThunk(
  'walkers/fetchWalkers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/walkers');
      console.log(response, await response.json());
      if (!response.ok) {
        throw new Error('Failed to fetch walkers');
      }
      const data = await response.json();
      return data.walkers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

async function fetchWalkersList() {
  try {
    const response = await fetch('http://localhost:5000/api/walkers');
    if (!response.ok) {
      throw new Error('Failed to fetch walkers');
    }
    const data = await response.json();
    return data.walkers;
  } catch (error) {
    console.log(error);
  }
}

const initialState = {
  walkers: await fetchWalkersList(),
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const walkerSlice = createSlice({
  name: 'walkers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalkers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWalkers.fulfilled, (state, action) => {
        state.walkers = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchWalkers.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default walkerSlice.reducer;
