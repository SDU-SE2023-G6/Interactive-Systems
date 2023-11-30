import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WalkConfirmationPage = () => {
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        navigate('/dashboard'); // Redirect to dashboard or another relevant page
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Walk Successfully Booked!</Typography>
            <Typography variant="body1" sx={{ marginBottom: 4 }}>
                Thank you for using WalkPaw. Your walk has been scheduled, and you will be notified with further details.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoToDashboard}
            >
                Go to Dashboard
            </Button>
        </Box>
    );
};

export default WalkConfirmationPage;