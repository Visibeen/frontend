import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import NameField from './NameField';
import TestimonialTextField from './TestimonialTextField';


const FieldsContainer = styled(Stack)(({ theme }) => ({
  gap: '24px'
}));

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

const FormFields = ({ formData, onFormChange }) => {
  return (
    <FieldsContainer>
      <NameField 
        value={formData.name}
        onChange={(value) => onFormChange('name', value)}
      />
      
      <TestimonialTextField 
        value={formData.testimonialText}
        onChange={(value) => onFormChange('testimonialText', value)}
      />
      
    </FieldsContainer>
  );
};

export default FormFields;