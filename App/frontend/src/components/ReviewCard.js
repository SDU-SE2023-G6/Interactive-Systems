import React from 'react';
import { Card, CardContent, Typography, Rating } from '@mui/material';

export default function ReviewCard({ review }) {
  return (
    <Card sx={{ margin: 1, padding: 2 }}>
      <CardContent>
        <div sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Rating value={review.rating} readOnly />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {review.rating}
          </Typography>
        </div>
        <Typography variant="body1">{review.text}</Typography>
      </CardContent>
    </Card>
  );
}
