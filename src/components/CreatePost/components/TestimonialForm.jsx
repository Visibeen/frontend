import React, { useState } from 'react';
import { Stack, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Stack)(({ theme }) => ({
  gap: '24px',
  width: '100%'
}));

const FormField = styled(Stack)(({ theme }) => ({
  gap: '8px'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  height: "20px",
  color: '#121927'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    height: "20px",
    color: '#0B91D6',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    '& fieldset': {
      borderColor: '#E0E0E0'
    },
    '&:hover fieldset': {
      borderColor: '#0B91D6'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0B91D6'
    }
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px'
  }
}));

const TestimonialForm = ({ formData, onFormChange }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  const handleChange = (field, value) => {
    const updatedData = { ...localFormData, [field]: value };
    setLocalFormData(updatedData);
    if (onFormChange) {
      onFormChange(updatedData);
    }
  };

  return (
    <FormContainer>
      <FormField>
        <FieldLabel>Name</FieldLabel>
        <StyledTextField
          value={localFormData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          variant="outlined"
          fullWidth
        />
      </FormField>
      
      <FormField>
        <FieldLabel>Testimonial Text</FieldLabel>
        <StyledTextField
          value={localFormData.testimonialText}
          onChange={(e) => handleChange('testimonialText', e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
        />
      </FormField>
    </FormContainer>
  );
};

export default TestimonialForm;