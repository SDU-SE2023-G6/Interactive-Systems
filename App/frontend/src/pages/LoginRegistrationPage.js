import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, Paper, Alert } from '@mui/material';
import { CustomTextField, CustomButton } from '../components/FormComponents';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/authSlice'; // Import the actions

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function LoginRegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Use isAuthenticated from authSlice
  const [tabValue, setTabValue] = useState(0);
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [registrationInfo, setRegistrationInfo] = useState({ email: '', password: '', fullName: '', username: '' });
  const [loginError, setLoginError] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Redirect authenticated users
    }
  }, [isAuthenticated, navigate]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setLoginError('');
    setRegistrationError('');
  };

  const handleLoginChange = (e, field) => {
    setLoginInfo({ ...loginInfo, [field]: e.target.value });
  };

  const handleRegistrationChange = (e, field) => {
    console.log(e.target)
    setRegistrationInfo({ ...registrationInfo, [field]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(loginInfo))
      .unwrap()
      .then(() => navigate('/dashboard'))
      .catch((error) => setLoginError(error.message));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(registrationInfo))
      .unwrap()
      .then(() => {
        navigate('/login'); // Redirect to login on success
        setTabValue(0); // Switch to login tab
      })
      .catch((error) => setRegistrationError(error.message));
  };

  return (
    <Paper>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="login registration tabs">
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        {loginError && <Alert severity="error">{loginError}</Alert>}
        <CustomTextField label="Email" name="email" value={loginInfo.email} onChange={(e) => handleLoginChange(e, "email")} />
        <CustomTextField label="Password" name="password" type="password" value={loginInfo.password} onChange={(e) => handleLoginChange(e, "password")} />
        <CustomButton text="Login" onClick={handleLoginSubmit} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {registrationError && <Alert severity="error">{registrationError}</Alert>}
        <CustomTextField label="Email" name="email" value={registrationInfo.email} onChange={(e) => handleRegistrationChange(e, "email")} />
        <CustomTextField label="Password" name="password" type="password" value={registrationInfo.password} onChange={(e) => handleRegistrationChange(e, "password")} />
        <CustomTextField label="Confirm Password" name="confirmPassword" type="password" value={registrationInfo.confirmPassword} onChange={(e) => handleRegistrationChange(e, "confirmPassword")} />
        <CustomTextField label="Full Name" name="fullName" value={registrationInfo.fullName} onChange={(e) => handleRegistrationChange(e, "fullName")} />
        <CustomTextField label="Username" name="username" value={registrationInfo.username} onChange={(e) => handleRegistrationChange(e, "username")} />
        <CustomButton text="Register" onClick={handleRegistrationSubmit} />
      </TabPanel>
    </Paper>
  );
}