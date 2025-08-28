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
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '540px',
  '& .MuiOutlinedInput-root': {
    minHeight: '20px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    '& fieldset': {
      borderWidth: '0.2px',
      borderColor: '#A0A0AA'
    },
    '&:hover fieldset': {
      borderColor: '#A0A0AA'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#A0A0AA'
    },
    '& textarea': {
      height: '20px',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 500,
      padding: '16px 18px',
      resize: 'none'
    }
  }
}));

const TestimonialTextField = ({ value, onChange }) => {
  return (
    <FieldContainer>
      <FieldLabel>Testimonial Text</FieldLabel>
      <StyledTextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        multiline
        rows={3}
        fullWidth
      />
    </FieldContainer>
  );
};

export default TestimonialTextField;