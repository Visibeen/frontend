import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import UserProfile from './UserProfile';
import FormFields from './FormFields';

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '40px',
  display: 'flex',
  gap: '40px',
  alignItems: 'flex-start',
  maxWidth: '1015px',
  width: '100%'
}));

const FormContent = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '40px'
}));

const ActionButtons = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px',
  justifyContent: 'flex-end'
}));

const CancelButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  color: '#EF232A',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'rgba(239, 35, 42, 0.04)'
  }
}));

const NextButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  color: '#ffffff',
  backgroundColor: '#0B91D6',
  padding: '8px 16px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#0980C2'
  }
}));

const TestimonialForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'John wick',
    testimonialText: 'I ordered cake for my wife . And it\'s very delicious Owner are very helpful and very polite.And cake was very very tastyThanks lot',
    backgroundColor: '#EF232A'
  });

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log('Cancel clicked');
  };

  const handleNext = () => {
    // Navigate to font style selection page
    navigate('/font-style');
  };

  return (
    <FormContainer>
      <UserProfile />
      
      <FormContent>
        <FormFields 
          formData={formData}
          onFormChange={handleFormChange}
        />
        
        <ActionButtons>
          <CancelButton onClick={handleCancel}>
            Cancel
          </CancelButton>
          <NextButton onClick={handleNext}>
            Next
          </NextButton>
        </ActionButtons>
      </FormContent>
    </FormContainer>
  );
};

export default TestimonialForm;