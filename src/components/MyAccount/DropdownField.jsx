import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '../icons/EditIcon';

const FieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '24px'
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
    padding: '12px 16px',
    cursor: 'pointer'
  }
}));

const EditButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '15px',
  height: '14px',
  '&:hover': {
    opacity: 0.7
  }
}));

const DropdownField = ({ 
  label, 
  value, 
  onChange, 
  placeholder,
  onEdit,
  onClick
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
          onClick={onClick}
          InputProps={{
            readOnly: true
          }}
        />
        <EditButton onClick={onEdit}>
          <EditIcon width={15} height={14} color="#0B91D6" />
        </EditButton>
      </InputContainer>
    </FieldContainer>
  );
};

export default DropdownField;