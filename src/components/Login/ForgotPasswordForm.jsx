import React, { useState } from 'react';
import { Box, Stack, Typography, TextField, Button, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SuccessAlert from './SuccessAlert';

const FormContainer = styled(Stack)(({ theme }) => ({
  width: '416px',
  gap: theme.spacing(3.25)
}));

const EmailLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#EF232A',
  marginBottom: theme.spacing(1)
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: '48px',
    borderRadius: '8px',
    '& fieldset': {
      border: '1px solid #E0E0E0'
    },
    '&:hover fieldset': {
      border: '1px solid #A0A0AA'
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #0B91D6'
    }
  },
  '& .MuiOutlinedInput-input': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: '#121927',
    '&::placeholder': {
      color: '#A0A0AA',
      opacity: 1
    }
  }
}));

const SendOtpButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '48px',
  borderRadius: '8px',
  backgroundColor: '#0B91D6',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: '#0277BD'
  },
  '&:disabled': {
    backgroundColor: '#A0A0AA',
    color: '#ffffff'
  }
}));

const LoginLink = styled(Link)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#0B91D6',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
    color: '#0277BD'
  }
}));

const LoginText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927',
  textAlign: 'center'
}));

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return email.trim() !== '' && validateEmail(email);
  };

  const handleSendOtp = async () => {
    if (!isFormValid()) {
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('http://52.44.140.230:8089/api/v1/customer/auth/forget_password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('resetEmail', email);
        setShowSuccess(true);
        
        // Navigate to verify OTP after showing success message
        setTimeout(() => {
          navigate('');
        }, 2000);
      } else {
        alert(data.message || "OTP not sent");
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Box>
        <EmailLabel>Email*</EmailLabel>
        <StyledTextField
          fullWidth
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={email !== '' && !validateEmail(email)}
        />
      </Box>

      <SendOtpButton 
        onClick={handleSendOtp}
        disabled={!isFormValid() || loading}
      >
        {loading ? 'Sending...' : 'Send OTP'}
      </SendOtpButton>

      {showSuccess && (
        <SuccessAlert message="Reset password link was sent to your register email" />
      )}

      <LoginText>
        Remember password?{' '}
        <LoginLink onClick={() => navigate('/login')}>
          Login
        </LoginLink>
      </LoginText>
    </FormContainer>
  );
};

export default ForgotPasswordForm;