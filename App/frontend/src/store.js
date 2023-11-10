// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import walksReducer from './features/walksSlice';
import reviewsReducer from './features/reviewsSlice';
import messagesReducer from './features/messagesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    walks: walksReducer,
    reviews: reviewsReducer,
    messages: messagesReducer,
  },
});