import React, { useState } from 'react';
import { Box, Tab, Tabs, Paper } from '@mui/material';
import { CustomTextField, CustomButton } from '../components/FormComponents';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function LoginRegistrationPage() {
  const [tabValue, setTabValue] = useState(0);
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [registrationInfo, setRegistrationInfo] = useState({ email: '', password: '', confirmPassword: '' });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Placeholder functions for form submission
  const handleLoginSubmit = () => console.log('Login Information:', loginInfo);
  const handleRegistrationSubmit = () => console.log('Registration Information:', registrationInfo);

  return (
    <Paper>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example">
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <CustomTextField label="Email" name="email" value={loginInfo.email} onChange={handleLoginSubmit} />
        <CustomTextField label="Password" name="password" type="password" value={loginInfo.password} onChange={handleLoginSubmit} />
        <CustomButton text="Login" onClick={handleLoginSubmit} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <CustomTextField label="Email" name="email" value={registrationInfo.email} onChange={handleRegistrationSubmit} />
        <CustomTextField label="Password" name="password" type="password" value={registrationInfo.password} onChange={handleRegistrationSubmit} />
        <CustomTextField label="Confirm Password" name="confirmPassword" type="password" value={registrationInfo.confirmPassword} onChange={handleRegistrationSubmit} />
        <CustomButton text="Register" onClick={handleRegistrationSubmit} />
      </TabPanel>
    </Paper>
  );
}
