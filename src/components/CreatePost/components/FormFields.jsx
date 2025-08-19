import React from 'react';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import NameField from './NameField';
import TestimonialTextField from './TestimonialTextField';


const FieldsContainer = styled(Stack)(({ theme }) => ({
  gap: '24px'
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