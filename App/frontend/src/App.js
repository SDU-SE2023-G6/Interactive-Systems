import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fetchUserDetails } from './features/userSlice'; // Updated import
import NavigationBar from './components/NavigationBar';
import FooterComponent from './components/FooterComponent';

// Import pages
import HomePage from './pages/HomePage';
import LoginRegistrationPage from './pages/LoginRegistrationPage';
import DashboardPage from './pages/DashboardPage';
import ProfileManagementPage from './pages/ProfileManagementPage';
import FindAWalkerPage from './pages/FindAWalkerPage';
import MyWalksPage from './pages/MyWalksPage';
import WalkSchedulingPage from './pages/WalkSchedulingPage';
import WalkTrackingPage from './pages/WalkTrackingPage';
import ReviewAndRatingPage from './pages/ReviewAndRatingPage';
import InAppMessagingPage from './pages/InAppMessagingPage';
import SettingsAndPreferencesPage from './pages/SettingsAndPreferencesPage';
import HelpAndSupportPage from './pages/HelpAndSupportPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4285F4', // Calming blue
    },
    secondary: {
      main: '#FFA726', // Warm orange
    },
    background: {
      default: '#f4f4f4', // Light grey
      paper: '#ffffff', // White
    },
    text: {
      primary: '#333333', // Dark grey for text
    }
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    }
  },
});

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Assuming you have a mechanism to get the logged-in user's ID
    const loggedInUserId = currentUser?.id || 'defaultUserId'; 
    dispatch(fetchUserDetails(loggedInUserId)); // Updated function call
  }, [currentUser, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginRegistrationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfileManagementPage />} />
          <Route path="/find-walker" element={<FindAWalkerPage />} />
          <Route path="/my-walks" element={<MyWalksPage />} />
          <Route path="/schedule-walk" element={<WalkSchedulingPage />} />
          <Route path="/track-walk" element={<WalkTrackingPage />} />
          <Route path="/review" element={<ReviewAndRatingPage />} />
          <Route path="/messaging" element={<InAppMessagingPage />} />
          <Route path="/settings" element={<SettingsAndPreferencesPage />} />
          <Route path="/help" element={<HelpAndSupportPage />} />
          {/* Add routes for any additional pages */}
        </Routes>
        <FooterComponent />
      </Router>
    </ThemeProvider>
  );
}

export default App;