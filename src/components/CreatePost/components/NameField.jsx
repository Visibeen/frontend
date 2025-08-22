import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const FieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#121927'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '540px',
  '& .MuiOutlinedInput-root': {
    height: '50px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    '& fieldset': {
      border: 'none'
    },
    '&:hover fieldset': {
      border: 'none'
    },
    '&.Mui-focused fieldset': {
      border: 'none'
    },
    '& input': {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 500,
      color: '#0B91D6',
      padding: '16px 18px'
    }
  }
}));

const NameField = ({ value, onChange }) => {
  return (
    <FieldContainer>
      <FieldLabel>Name</FieldLabel>
      <StyledTextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        fullWidth
      />
    </FieldContainer>
  );
};

export default NameField;