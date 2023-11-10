// src/features/walksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  walks: [],
};

export const walksSlice = createSlice({
  name: 'walks',
  initialState,
  reducers: {
    addWalk: (state, action) => {
      state.walks.push(action.payload);
    },
    // Additional reducers as needed
  },
});

export const { addWalk } = walksSlice.actions;

export default walksSlice.reducer;