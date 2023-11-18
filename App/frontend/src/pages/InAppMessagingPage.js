import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import MessageListAndChatBox from '../components/MessageListAndChatBox';
import { fetchMessages, createMessage } from '../features/messagesSlice';

function InAppMessagingPage() {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  const currentUser = useSelector((state) => state.user.currentUser); // Fetch current user from the user slice

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSendMessage = (newMessageText) => {
    if (!currentUser) {
      console.error('No user logged in');
      return;
    }

    const newMessageData = {
      text: newMessageText,
      senderId: currentUser.id, // or any unique identifier from the user data
      senderName: currentUser.name // Optional, if you want to display the name
    };
    dispatch(createMessage(newMessageData));
  };

  return (
    <Box sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography variant="h4">In-App Messaging</Typography>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <MessageListAndChatBox messages={messages} onSendMessage={handleSendMessage} />
      </Box>
    </Box>
  );
}

export default InAppMessagingPage;
