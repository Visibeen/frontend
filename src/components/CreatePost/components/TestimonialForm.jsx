import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import UserProfile from './UserProfile';
import FormFields from './FormFields';
import PostService from '../../../services/PostService';

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
  maxWidth: '1015px',
  width: '100%'
}));

const FormContent = styled(Stack)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  gap: '32px'
}));

const ActionButtons = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px',
  justifyContent: 'center',
  width: '540px',
  alignSelf: 'center'
}));

const CancelButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  width: '150px',
  height: '45px',
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
  width: '150px',
  height: '45px',
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
  const [submitting, setSubmitting] = useState(false);

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

  const handleNext = async () => {
    try {
      setSubmitting(true);
      // POST to create post API
      await PostService.createPost({
        name: formData.name,
        testimonialText: formData.testimonialText,
        backgroundColor: formData.backgroundColor
      });
      navigate('/font-style');
    } catch (err) {
      console.error('Failed to create post', err);
      alert('Failed to create post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormContent>
        <UserProfile />

        <FormFields 
          formData={formData}
          onFormChange={handleFormChange}
        />

        <ActionButtons>
          <CancelButton onClick={handleCancel} disabled={submitting}>
            Cancel
          </CancelButton>
          <NextButton onClick={handleNext} disabled={submitting}>
            Next
          </NextButton>
        </ActionButtons>
      </FormContent>
    </FormContainer>
  );
};

export default TestimonialForm;