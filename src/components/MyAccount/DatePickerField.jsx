import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarIcon from '../icons/CalendarIcon';

const FieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#EF232A'
}));

const InputContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    '& fieldset': {
      borderColor: '#a0a0aa',
      borderWidth: '0.2px'
    },
    '&:hover fieldset': {
      borderColor: '#0B91D6'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0B91D6'
    }
  },
  '& .MuiInputBase-input': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#0B91D6',
    padding: '12px 16px'
  }
}));

const CalendarButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '17px',
  height: '19px',
  '&:hover': {
    opacity: 0.7
  }
}));

const DatePickerField = ({ 
  label, 
  value, 
  onChange, 
  placeholder,
  onCalendarClick 
}) => {
  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <InputContainer>
        <StyledTextField
          fullWidth
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          variant="outlined"
        />
        <CalendarButton onClick={onCalendarClick}>
          <CalendarIcon width={17} height={19} color="#0B91D6" />
        </CalendarButton>
      </InputContainer>
    </FieldContainer>
  );
};

export default DatePickerField;