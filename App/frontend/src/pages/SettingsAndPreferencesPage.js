import React, { useState } from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';

function SettingsAndPreferencesPage() {
  const [settings, setSettings] = useState({
    receiveNotifications: true,
    makeProfilePublic: false,
    // Add more settings as needed
  });

  const handleSettingChange = (event) => {
    setSettings({ ...settings, [event.target.name]: event.target.checked });
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
