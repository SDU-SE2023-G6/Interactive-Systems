import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import MapComponent from '../components/MapComponent';

function WalkTrackingPage() {
  const [walkPath, setWalkPath] = useState([]);

  useEffect(() => {
    const mockWalkPath = [
      { lat: 40.7128, lng: -74.0060 }, // Example coordinates
      // ... more coordinates for the walk path
    ];
    setWalkPath(mockWalkPath);
  }, []);

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
