import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function WalkSummaryCard({ walk }) {
  return (
    <Card sx={{ margin: 1, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>Walk with {walk.walkerName}</Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>Date: {walk.date}</Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>Duration: {walk.duration} minutes</Typography>
      </CardContent>
    </Card>
  );
}
