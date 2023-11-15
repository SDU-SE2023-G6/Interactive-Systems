import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import RatingComponent from '../components/RatingComponent';
import { CustomTextField } from '../components/FormComponents';

function ReviewAndRatingPage() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    console.log('Review:', { rating, reviewText });
    // Add logic to submit review to the backend
  };

  return (
    <Box sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4">Leave a Review</Typography>
      <RatingComponent onRatingChange={handleRatingChange} />
      <Box component="form" noValidate sx={{ width: '100%', maxWidth: 500, marginTop: 3 }}>
        <CustomTextField
          label="Your Review"
          name="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          multiline
          rows={4}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: 2 }}
        >
          Submit Review
        </Button>
      </Box>
    </Box>
  );
}

export default ReviewAndRatingPage;
