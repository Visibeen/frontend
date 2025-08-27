import React from 'react';
import { Box, FormControl, Select, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const SettingsContainer = styled(Box)(({ theme }) => ({
  marginBottom: '24px'
}));

const SettingsLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#121927',
  marginBottom: '8px'
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  width: '540px',
  height: '50px',
  borderRadius: '8px',
  border: '0.2px solid #A0A0AA',
  backgroundColor: '#ffffff',
  '& .MuiSelect-select': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: '#A0A0AA',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const TimeIcon = styled(AccessTimeIcon)(({ theme }) => ({
  width: '17px',
  height: '19px',
  color: '#A0A0AA'
}));

const AutomationSettings = ({ selectedTime, onTimeChange }) => {
  const timeOptions = [
    { value: 'immediate', label: 'Immediately' },
    { value: '1hour', label: '1 Hour' },
    { value: '24hours', label: '24 Hours' },
    { value: '3days', label: '3 Days' },
    { value: '1week', label: '1 Week' }
  ];

  return (
    <SettingsContainer>
      <SettingsLabel>Trigger Automation Settings</SettingsLabel>
      <FormControl fullWidth>
        <StyledSelect
          value={selectedTime}
          onChange={(e) => onTimeChange(e.target.value)}
          displayEmpty
          IconComponent={TimeIcon}
        >
          <StyledMenuItem value="">
            <em>Select time</em>
          </StyledMenuItem>
          {timeOptions.map((option) => (
            <StyledMenuItem key={option.value} value={option.value}>
              {option.label}
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </SettingsContainer>
  );
};

export default AutomationSettings;