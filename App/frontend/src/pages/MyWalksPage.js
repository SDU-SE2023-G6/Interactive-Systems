import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import WalkSummaryCard from '../components/WalkSummaryCard';

function MyWalksPage() {
  const [walks, setWalks] = useState([]);

  useEffect(() => {
    const mockWalks = [
      { id: 1, date: '2023-04-10', duration: 60, ownerName: 'Owner 1' },
    ];
    setWalks(mockWalks);
  }, []);

  return (
    <Box sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4">My Scheduled Walks</Typography>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        {walks.map((walk) => (
          <WalkSummaryCard key={walk.id} walk={walk} />
        ))}
      </Box>
    </Box>
  );
}

export default MyWalksPage;
