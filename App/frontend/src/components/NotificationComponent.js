import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function NotificationComponent({ open, message, severity, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose} sx={{ marginTop: 1 }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
