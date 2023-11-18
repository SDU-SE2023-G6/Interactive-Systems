import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { fetchWalks } from '../features/walksSlice';

function DashboardPage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { walks } = useSelector((state) => state.walks);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchWalks());
    }
  }, [dispatch, currentUser]);

  console.log(currentUser);
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4
    }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {currentUser ? `Welcome, ${currentUser.fullName}` : 'Dashboard'}
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
