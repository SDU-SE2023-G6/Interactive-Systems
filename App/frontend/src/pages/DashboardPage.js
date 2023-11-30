import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { fetchWalks } from '../features/walksSlice';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { walks } = useSelector((state) => state.walks);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchWalks());
    }
  }, [dispatch, currentUser]);

  const handleBookWalkClick = () => {
    navigate('/book-walk');
  };

  const formatWalkDate = (dateString) => {
    // Parse the ISO string and format it
    return format(parseISO(dateString), 'MMM do, yyyy, h:mm a');
  };

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { sm: '1fr', md: '1fr 1fr' },
      gap: 4,
      alignItems: 'start',
      justifyContent: 'center',
      padding: 4
    }}>
      <Box>
        <Typography variant="h4" sx={{ marginBottom: 2, color: 'secondary.main' }}>
          {currentUser ? `Welcome, ${currentUser.fullName}` : 'Dashboard'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBookWalkClick}
          sx={{ marginBottom: 2 }}
        >
          Book a New Walk
        </Button>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 360,
        margin: '0 auto'
      }}>
        {walks.length > 0 ? (
          walks.map((walk) => (
            <Typography key={walk.id} sx={{ padding: 2, borderBottom: '1px solid #ccc', cursor: 'pointer' }}>
              Walk on {formatWalkDate(walk.date)}
            </Typography>
          ))
        ) : (
          <Typography sx={{ color: 'text.secondary' }}>No upcoming walks.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default DashboardPage;