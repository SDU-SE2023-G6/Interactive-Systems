import React from 'react';
import { Box, Typography } from '@mui/material';
import MapComponent from '../components/MapComponent'; // Assuming MapComponent exists for tracking

function WalkTrackingPage() {
  // Assuming walkPath is obtained from the walk tracking API
  const walkPath = []; // Replace with actual logic to obtain walk path data

  return (
    <Box sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4">Track Your Dog's Walk</Typography>
      <Box sx={{ width: '100%', maxWidth: 800, height: 400 }}>
        <MapComponent walkPath={walkPath} />
      </Box>
    </Box>
  );
}

export default WalkTrackingPage;
