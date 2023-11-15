import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { CustomTextField } from '../components/FormComponents';
import UserProfileCard from '../components/UserProfileCard';

function ProfileManagementPage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({ name: '', email: '' });

  React.useEffect(() => {
    if (currentUser) {
      setProfile({ name: currentUser.name, email: currentUser.email });
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    console.log('Updated Profile:', profile);
    // Dispatch the update profile action
    // dispatch(updateUserProfile(profile));
  };

  return (
    <Box sx={{
      padding: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4">Profile Management</Typography>
      <UserProfileCard user={currentUser} />
      <Box component="form" noValidate sx={{ width: '100%', maxWidth: 500, marginTop: 3 }}>
        <CustomTextField
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleInputChange}
        />
        <CustomTextField
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: 2 }}
        >
          Update Profile
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileManagementPage;
