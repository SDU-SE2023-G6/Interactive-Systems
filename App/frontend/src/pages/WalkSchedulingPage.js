import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CalendarComponent from '../components/CalendarComponent';

function WalkSchedulingPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const mockEvents = [
      { title: 'Walk with Bella', date: '2023-04-15', id: 1 },
      // ... more events
    ];
    setEvents(mockEvents);
  }, []);

  const handleDateClick = (arg) => {
    console.log('Date clicked: ', arg.dateStr);
    // Logic for scheduling a new walk or viewing existing walks
  };

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
