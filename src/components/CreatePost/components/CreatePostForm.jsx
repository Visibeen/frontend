import React, { useState } from 'react';
import { Stack, Typography, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ColorPicker from './ColorPicker';

const FormContainer = styled(Stack)(({ theme }) => ({
  gap: '24px',
  width: '100%'
}));

const FieldContainer = styled(Stack)(({ theme }) => ({
  gap: '8px'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#121927'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#0B91D6',
    '& fieldset': {
      border: 'none'
    },
    '& input': {
      padding: '12px 0'
    },
    '& textarea': {
      padding: '12px 0'
    }
  }
}));

const ActionButtons = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px',
  justifyContent: 'center',
  marginTop: '32px'
}));

const CancelButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  width: '150px',
  height: '45px',
  padding: '12px 24px',
  color: '#EF232A',
  textTransform: 'capitalize',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '12px 24px',
  '&:hover': {
    backgroundColor: 'rgba(239, 35, 42, 0.04)'
  }
}));

const NextButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  width: '150px',
  height: '45px',
  color: '#ffffff',
  textTransform: 'capitalize',
  backgroundColor: '#0B91D6',
  border: 'none',
  borderRadius: '8px',
  padding: '12px 24px',
  '&:hover': {
    backgroundColor: '#0277BD'
  }
}));

const CreatePostForm = ({ initialData, onCancel, onNext }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    testimonialText: initialData?.testimonialText || '',
    backgroundColor: initialData?.backgroundColor || '#EF232A'
  });

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleColorChange = (event) => {
    setFormData(prev => ({
      ...prev,
      backgroundColor: event.target.value
    }));
  };

  const handleSubmit = () => {
    if (onNext) {
      onNext(formData);
    }
  };

  return (
    <FormContainer>
      <FieldContainer>
        <FieldLabel>Name</FieldLabel>
        <StyledTextField
          value={formData.name}
          onChange={handleInputChange('name')}
          variant="outlined"
          fullWidth
        />
      </FieldContainer>

      <FieldContainer>
        <FieldLabel>Testimonial Text</FieldLabel>
        <StyledTextField
          value={formData.testimonialText}
          onChange={handleInputChange('testimonialText')}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
        />
      </FieldContainer>

      <FieldContainer>
        <FieldLabel>Background Color</FieldLabel>
        <ColorPicker
          value={formData.backgroundColor}
          onChange={handleColorChange}
        />
      </FieldContainer>

      <ActionButtons>
        <CancelButton onClick={onCancel}>
          Cancel
        </CancelButton>
        <NextButton onClick={handleSubmit}>
          Next
        </NextButton>
      </ActionButtons>
    </FormContainer>
  );
};

export default CreatePostForm;