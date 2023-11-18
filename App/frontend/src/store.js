// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import walksReducer from './features/walksSlice';
import reviewsReducer from './features/reviewsSlice';
import messagesReducer from './features/messagesSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    walks: walksReducer,
    reviews: reviewsReducer,
    messages: messagesReducer,
  },
});