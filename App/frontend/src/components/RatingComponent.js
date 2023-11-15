import React, { useState } from 'react';
import { Rating, Typography, Box } from '@mui/material';

export default function RatingComponent({ onRatingChange }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onRatingChange(newValue);
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 2
    }}>
      <Typography component="legend">Rate your experience</Typography>
      <Rating name="simple-controlled" value={value} onChange={handleChange} />
    </Box>
  );
}
