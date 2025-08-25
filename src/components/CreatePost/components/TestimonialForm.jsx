import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import UserProfile from './UserProfile';
import FormFields from './FormFields';

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
  const [form, setForm] = useState({
    name: '',
    testimonial_text: ''
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAndNext = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem('authToken')
    const payload = {
      user_id: user?.id,
      name: form.name,
      testimonial_text: form.testimonial_text
    };
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem('userData'));
      const response = await axios.post(
        'http://52.44.140.230:8089/api/v1/customer/post/create-post',
        payload,
        {
          headers: {
            Authorization: `${token?.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('API Response:', response.data);
      navigate('/upload-logo');
    } catch (error) {
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
      alert('Something went wrong while submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };
  return (
    <FormContainer>
      <FormContent>
        <UserProfile />
        <FormFields formData={form} onFormChange={handleChange} />
        <ActionButtons>
          <CancelButton onClick={handleCancel} disabled={loading}>
            Cancel
          </CancelButton>
          <NextButton onClick={handleSaveAndNext} disabled={loading}>
            Next
          </NextButton>
        </ActionButtons>
      </FormContent>
    </FormContainer>
  );
};

export default TestimonialForm;
