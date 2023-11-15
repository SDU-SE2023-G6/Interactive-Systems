import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

export default function UserProfileCard({ user }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
      <Avatar alt={user.name} src={user.profilePic} sx={{ marginRight: 2, width: 56, height: 56 }} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2">{user.email}</Typography>
      </CardContent>
    </Card>
  );
}
