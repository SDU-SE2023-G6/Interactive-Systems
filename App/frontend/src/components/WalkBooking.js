import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookWalk } from '../features/walksSlice';
import { fetchWalkers } from '../features/walkerSlice';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { TextField, Select, MenuItem, Button, Box, Grid, FormControl, InputLabel, FormHelperText, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';


const WalkBooking = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const { walkers } = useSelector((state) => state.walkers);
    const [walkDetails, setWalkDetails] = useState({
        date: new Date(),
        duration: 30,
        walkerId: '',
        specialRequirements: '',
        ownerId: '',
        location: '',
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        dispatch(fetchWalkers());
    }, [dispatch]);

    const handleDateChange = (date) => {
        setWalkDetails({ ...walkDetails, date });
    };

    const handleLocationChange = (event) => {
        setWalkDetails({ ...walkDetails, location: event.target.value });
    };

    const handleDurationChange = (event) => {
        setWalkDetails({ ...walkDetails, duration: event.target.value });
    };

    const handleWalkerChange = (event) => {
        setWalkDetails({ ...walkDetails, walkerId: event.target.value });
    };

    const handleSpecialRequirementsChange = (event) => {
        setWalkDetails({ ...walkDetails, specialRequirements: event.target.value });
    };

    const validateForm = () => {
        let errors = {};
        if (!walkDetails.location) errors.location = 'Location is required.';
        if (!walkDetails.walkerId) errors.walker = 'Please select a walker.';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        walkDetails.ownerId = currentUser._id;
        dispatch(bookWalk(walkDetails));
        navigate('/walk-confirmation');
    };

    return (
        <Box sx={{ mt: 4, mx: 'auto', width: '100%', maxWidth: '768px' }}>
            <Typography variant="h6" gutterBottom>Book a Walk</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={walkDetails.date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} error={!!formErrors.date} helperText={formErrors.date || 'Select a date'} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                value={walkDetails.date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} error={!!formErrors.time} helperText={formErrors.time || 'Select a time'} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!formErrors.location}>
                            <InputLabel htmlFor="location">Location</InputLabel>
                            <TextField
                                id="location"
                                value={walkDetails.location}
                                onChange={handleLocationChange}
                                error={!!formErrors.location}
                                helperText={formErrors.location || ''}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!formErrors.walker}>
                            <InputLabel id="walker-label">Walker</InputLabel>
                            <Select
                                labelId="walker-label"
                                value={walkDetails.walkerId}
                                onChange={handleWalkerChange}
                                displayEmpty
                                renderValue={
                                    walkDetails.walkerId !== '' ? undefined : () => <Typography color="textSecondary">Select a Walker</Typography>
                                }
                            >
                                {walkers.map((walker) => (
                                    <MenuItem key={walker._id} value={walker._id}>{walker.fullName}</MenuItem>
                                ))}
                            </Select>
                            {formErrors.walker && <FormHelperText>{formErrors.walker}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="number"
                            value={walkDetails.duration}
                            onChange={handleDurationChange}
                            label="Duration (minutes)"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={walkDetails.specialRequirements}
                            onChange={handleSpecialRequirementsChange}
                            label="Special Requirements"
                            multiline
                            fullWidth
                            helperText="Include any additional needs your dog has"
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1 }}>Book Walk</Button>
            </form>
        </Box>
    );
};

export default WalkBooking;