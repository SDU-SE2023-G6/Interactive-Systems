import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import { updateUserDetails } from '../features/userSlice'; // Assuming updateUserDetails action exists

function SettingsAndPreferencesPage() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.user.settings); // Assuming settings structure in the user slice

  const handleSettingChange = (event) => {
    const updatedSettings = { ...settings, [event.target.name]: event.target.checked };
    dispatch(updateUserDetails(updatedSettings));
  };

  return (
    <Box sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4">Settings and Preferences</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={settings.receiveNotifications}
            onChange={handleSettingChange}
            name="receiveNotifications"
          />
        }
        label="Receive Notifications"
        sx={{ margin: 2 }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={settings.makeProfilePublic}
            onChange={handleSettingChange}
            name="makeProfilePublic"
          />
        }
        label="Make Profile Public"
        sx={{ margin: 2 }}
      />
      {/* Add more settings options here */}
    </Box>
  );
}

export default SettingsAndPreferencesPage;
