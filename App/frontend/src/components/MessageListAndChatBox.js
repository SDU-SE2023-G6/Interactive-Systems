import React, { useState } from 'react';
import { List, ListItem, ListItemText, Divider, TextField, Button } from '@mui/material';

export default function MessageListAndChatBox({ messages, onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    onSendMessage(message);
    setMessage('');
  };

  return (
    <>
      <List sx={{
        width: '100%',
        maxHeight: '300px',
        overflow: 'auto',
        backgroundColor: 'background.paper',
      }}>
        {/* ... */}
      </List>
      <div sx={{
        marginTop: 2,
        display: 'flex',
        alignItems: 'center'
      }}>
        <TextField
          label="Type a message"
          variant="outlined"
          sx={{ marginRight: 1, flexGrow: 1 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </>
  );
}
