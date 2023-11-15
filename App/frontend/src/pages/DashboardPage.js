import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

function DashboardPage() {
  const { currentUser } = useSelector((state) => state.user);
  const walks = []; // Placeholder data

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4
    }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {currentUser ? `Welcome, ${currentUser.name}` : 'Dashboard'}
      </Typography>
      <Box>
        {walks.length > 0 ? (
          walks.map((walk) => (
            <Typography key={walk.id}>Walk on {walk.date}</Typography>
          ))
        ) : (
          <Typography>No upcoming walks.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default DashboardPage;
