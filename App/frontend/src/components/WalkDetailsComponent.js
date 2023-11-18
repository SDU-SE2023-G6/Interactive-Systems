import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function WalkDetailsComponent({ walk }) {
  // Add edit and delete logic as needed

  return (
    <Box>
      <Typography variant="h6">Walk Details</Typography>
      <Typography>{`Walk with ${walk.dogName} on ${walk.date}`}</Typography>
      {/* Additional walk details */}
      <Button>Edit</Button>
      <Button>Delete</Button>
    </Box>
  );
}

export default WalkDetailsComponent;
