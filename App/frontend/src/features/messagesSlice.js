// src/features/messagesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // Additional reducers as needed
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;