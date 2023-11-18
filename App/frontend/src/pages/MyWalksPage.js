import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import WalkSummaryCard from '../components/WalkSummaryCard';
import { fetchWalks } from '../features/walksSlice'; // Assuming a walksSlice exists with fetchWalks

function MyWalksPage() {
  const dispatch = useDispatch();
  const { walks, status } = useSelector((state) => state.walks);

  useEffect(() => {
    dispatch(fetchWalks());
  }, [dispatch]);

  return (
    <Box sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4">My Scheduled Walks</Typography>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        {status === 'loading' ? (
          <Typography>Loading walks...</Typography>
        ) : walks.length > 0 ? (
          walks.map((walk) => (
            <WalkSummaryCard key={walk.id} walk={walk} />
          ))
        ) : (
          <Typography>No scheduled walks.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default MyWalksPage;
