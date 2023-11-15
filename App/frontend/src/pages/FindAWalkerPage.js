import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import WalkerListingCard from '../components/WalkerListingCard';

function FindAWalkerPage() {
  const [walkers, setWalkers] = useState([]);

  useEffect(() => {
    const mockWalkers = [
      { id: 1, name: 'Walker 1', profilePic: '', rating: 4.5 },
    ];
    setWalkers(mockWalkers);
  }, []);

  return (
    <Box sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4">Find a Walker</Typography>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        {walkers.map((walker) => (
          <WalkerListingCard key={walker.id} walker={walker} />
        ))}
      </Box>
    </Box>
  );
}

export default FindAWalkerPage;
