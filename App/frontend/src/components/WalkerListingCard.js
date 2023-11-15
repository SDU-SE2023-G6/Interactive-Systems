import React from 'react';
import { Card, CardContent, Typography, Avatar, Button } from '@mui/material';

export default function WalkerListingCard({ walker }) {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 1, padding: 2 }}>
      <Avatar alt={walker.name} src={walker.profilePic} sx={{ marginRight: 2, width: 56, height: 56 }} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{walker.name}</Typography>
        <Typography variant="body2">Rating: {walker.rating}</Typography>
      </CardContent>
      <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>
        View Profile
      </Button>
    </Card>
  );
}
