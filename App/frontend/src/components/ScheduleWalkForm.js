import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

function ScheduleWalkForm({ onSubmit }) {
  const [walkDetails, setWalkDetails] = useState({ date: '', duration: '', dogName: '' });

  const handleChange = (e) => {
    setWalkDetails({ ...walkDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(walkDetails);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Date"
        type="date"
        name="date"
        value={walkDetails.date}
        onChange={handleChange}
        required
      />
      <TextField
        label="Duration"
        type="number"
        name="duration"
        value={walkDetails.duration}
        onChange={handleChange}
        required
      />
      <TextField
        label="Dog Name"
        type="text"
        name="dogName"
        value={walkDetails.dogName}
        onChange={handleChange}
        required
      />
      <Button type="submit">Schedule Walk</Button>
    </Box>
  );
}

export default ScheduleWalkForm;
