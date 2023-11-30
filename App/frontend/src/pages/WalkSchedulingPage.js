import React from 'react';
import WalkBooking from '../components/WalkBooking';
import { Box, Typography } from '@mui/material';

function WalkSchedulingPage() {
  return (
    <Box sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4">Schedule a Walk</Typography>
      <WalkBooking />
    </Box>
  );
}

export default WalkSchedulingPage;
