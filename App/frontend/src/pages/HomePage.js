import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4
    }}>
      <Typography variant="h3" sx={{ marginBottom: 2 }}>
        Welcome to WalkPaw
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 4 }}>
        Connect with trusted dog walkers and simplify your dog's exercise routine.
      </Typography>
      <Link to="/find-walker" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">Find a Walker</Button>
      </Link>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="secondary" sx={{ marginTop: 2 }}>Login / Register</Button>
      </Link>
    </Box>
  );
}

export default HomePage;
