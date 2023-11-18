import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/authSlice'; // Import the logoutUser action

export default function NavigationBar() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); // Navigate to the home page after logout
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            WalkPaw
          </Typography>
          {!isAuthenticated && (
            <>
              <Link to="/">
                <Button color="inherit">Home</Button>
              </Link>
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/register">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/dashboard">
                <Button color="inherit">Dashboard</Button>
              </Link>
              <Link to="/mywalks">
                <Button color="inherit">My Walks</Button>
              </Link>
              <Link to="/profile">
                <Button color="inherit">Profile</Button>
              </Link>
              <Link to="/messaging">
                <Button color="inherit">Messages</Button>
              </Link>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
