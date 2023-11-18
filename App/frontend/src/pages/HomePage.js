import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4
    }}>
      {!isAuthenticated && (
        <div>
          <Typography variant="h4">Welcome to WalkPaw</Typography>
          <Typography variant="subtitle1">Connecting dog owners with trusted dog walkers.</Typography>
          <Box sx={{ mt: 2 }}>
            <Link to="/login">
              <Button variant="contained">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="contained" sx={{ ml: 2 }}>Register</Button>
            </Link>
          </Box>
        </div>
      )}
    </Box>
  );
}

export default HomePage;
