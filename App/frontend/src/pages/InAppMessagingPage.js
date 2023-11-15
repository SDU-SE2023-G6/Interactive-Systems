import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import MessageListAndChatBox from '../components/MessageListAndChatBox';

function InAppMessagingPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const mockMessages = [
      { sender: 'Walker 1', text: 'Looking forward to walking Bella tomorrow!' },
    ];
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = (newMessage) => {
    console.log('New Message:', newMessage);
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
