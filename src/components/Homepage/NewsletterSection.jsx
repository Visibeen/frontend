import React, { useState } from 'react';
import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const NewsletterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F8F8',
  padding: '80px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '40px'
}));

const NewsletterHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '16px',
  textAlign: 'center'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '50px',
  fontWeight: 700,
  lineHeight: '60px',
  color: '#121927'
}));

const NewsletterForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  border: '1px solid #EAEAEA',
  padding: '8px',
  width: '685px',
  gap: '16px'
}));

const EmailInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    border: 'none',
    '& fieldset': {
      border: 'none'
    },
    '& input': {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      color: '#121927',
      padding: '12px 16px',
      '&::placeholder': {
        color: '#A0A0AA',
        opacity: 1
      }
    }
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#EF232A',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 600,
  width: '150px',
  height: '45px',
  textTransform: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  minWidth: '95px',
  '&:hover': {
    backgroundColor: '#DC2626',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(239, 35, 42, 0.3)'
  },
  transition: 'all 0.2s ease'
}));

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <NewsletterContainer>
      <NewsletterHeader>
        <SectionTitle>
          Subscribe our newsletter<br />
          to get new updates
        </SectionTitle>
      </NewsletterHeader>

      <NewsletterForm component="form" onSubmit={handleSubmit}>
        <EmailInput
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          type="email"
          required
        />
        <SubmitButton type="submit">
          Get Started
        </SubmitButton>
      </NewsletterForm>
    </NewsletterContainer>
  );
};

export default NewsletterSection;