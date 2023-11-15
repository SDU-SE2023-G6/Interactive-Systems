import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function FooterComponent() {
  return (
    <Box component="footer" sx={{
      backgroundColor: 'background.paper',
      padding: 6,
      marginTop: 'auto',
      textAlign: 'center'
    }}>
      <Typography variant="h6" align="center" gutterBottom>
        WalkPaw
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Simplify your dog's exercise routine.
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {'© '}
        {new Date().getFullYear()}
        {' WalkPaw, Inc. All rights reserved.'}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="#">
          Privacy Policy
        </Link>
        {' | '}
        <Link color="inherit" href="#">
          Terms of Use
        </Link>
      </Typography>
    </Box>
  );
}
