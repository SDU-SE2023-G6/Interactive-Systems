import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import WalkerListingCard from '../components/WalkerListingCard';
import { fetchWalkers } from '../features/walkerSlice'; // Assuming a walkerSlice exists

function FindAWalkerPage() {
  const dispatch = useDispatch();
  const { walkers, status } = useSelector((state) => state.walkers);

  useEffect(() => {
    dispatch(fetchWalkers());
  }, [dispatch]);

  return (
    <Box sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4">Find a Walker</Typography>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        {status === 'loading' ? (
          <Typography>Loading walkers...</Typography>
        ) : walkers.length > 0 ? (
          walkers.map((walker) => (
            <WalkerListingCard key={walker.id} walker={walker} />
          ))
        ) : (
          <Typography>No walkers available.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default FindAWalkerPage;
