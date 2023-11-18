import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import CalendarComponent from '../components/CalendarComponent';
import { fetchWalks } from '../features/walksSlice'; // Assuming a walksSlice exists
import { useNavigate } from 'react-router-dom';

function WalkSchedulingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { walks } = useSelector((state) => state.walks);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(fetchWalks());
  }, [dispatch]);

  const handleDateClick = (arg) => {
    const dateClicked = arg.dateStr;
    setSelectedDate(dateClicked);

    // Check if there is already a walk scheduled for this date
    const walkOnDate = walks.find(walk => walk.date === dateClicked);

    if (walkOnDate) {
      // If a walk is scheduled, navigate to the walk details page
      // Assuming a route like '/walk-details/:walkId' exists
      navigate(`/walk-details/${walkOnDate.id}`);
    } else {
      // If no walk is scheduled, open a modal or navigate to a scheduling page
      // For this example, let's assume we navigate to a new scheduling page
      // The route '/schedule-walk' should handle scheduling a new walk
      navigate(`/schedule-walk?date=${dateClicked}`);
    }
  };

  // Transform walks data to the format expected by CalendarComponent
  const events = walks.map(walk => ({
    title: `Walk with ${walk.dogName}`,
    date: walk.date,
    id: walk.id
  }));

  return (
    <Box sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4">Schedule a Walk</Typography>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <CalendarComponent events={events} onEventClick={handleDateClick} />
      </Box>
    </Box>
  );
}

export default WalkSchedulingPage;
