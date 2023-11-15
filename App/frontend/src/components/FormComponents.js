import React from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export const CustomTextField = ({ label, value, onChange }) => (
  <TextField
    label={label}
    variant="outlined"
    value={value}
    onChange={onChange}
    fullWidth
    margin="normal"
  />
);

export const CustomButton = ({ text, onClick, variant = 'contained', color = 'primary' }) => (
  <Button
    variant={variant}
    color={color}
    onClick={onClick}
    fullWidth
  >
    {text}
  </Button>
);

export const CustomSelect = ({ label, value, onChange, options }) => {
  return (
    <FormControl variant="outlined" fullWidth sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        sx={{ mt: 2 }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
