import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import WalkSummaryCard from '../components/WalkSummaryCard';
import { fetchWalks } from '../features/walksSlice';
import { useNavigate } from 'react-router-dom';

function MyWalksPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { walks, status } = useSelector((state) => state.walks);

  useEffect(() => {
    dispatch(fetchWalks());
  }, [dispatch]);

  const handleBookWalkClick = () => {
    navigate('/book-walk');
  };

  return (
    <Box sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4">My Scheduled Walks</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBookWalkClick}
        sx={{ marginBottom: 2 }}
      >
        Book a New Walk
      </Button>
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
