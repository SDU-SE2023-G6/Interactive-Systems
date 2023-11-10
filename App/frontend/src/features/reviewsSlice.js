// src/features/reviewsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
    // Additional reducers as needed
  },
});

export const { addReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;