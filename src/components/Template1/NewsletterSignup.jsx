import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const NewsletterContainer = styled(Stack)(({ theme }) => ({
  gap: '16px'
}));

const NewsletterTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '16px',
  fontWeight: 700,
  color: theme.palette.primary.main
}));

const NewsletterSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#333333'
}));

const NewsletterForm = styled(Stack)(({ theme }) => ({
  gap: '12px'
}));

const NewsletterInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    '& input': {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      color: '#333333',
      '&::placeholder': {
        color: '#a2a9b0'
      }
    }
  }
}));

const NewsletterButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'uppercase',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const NewsletterSignup = ({ newsletter }) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      setIsValidEmail(validateEmail(value));
    } else {
      setIsValidEmail(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && validateEmail(email)) {
      console.log('Newsletter signup:', email);
      setEmail('');
      // Handle newsletter signup
    } else {
      setIsValidEmail(false);
    }
  };

  return (
    <NewsletterContainer>
      <NewsletterTitle>
        {newsletter?.title || 'Join a Newsletter'}
      </NewsletterTitle>
      <NewsletterSubtitle>Your Email</NewsletterSubtitle>
      
      <NewsletterForm component="form" onSubmit={handleSubmit}>
        <NewsletterInput
          type="email"
          placeholder={newsletter?.placeholder || 'Enter Your Email'}
          value={email}
          onChange={handleEmailChange}
          error={!isValidEmail}
          helperText={!isValidEmail ? 'Please enter a valid email address' : ''}
          fullWidth
          size="small"
        />
        <NewsletterButton
          type="submit"
          variant="contained"
        >
          {newsletter?.buttonText || 'Send'}
        </NewsletterButton>
      </NewsletterForm>
    </NewsletterContainer>
  );
};

export default NewsletterSignup;