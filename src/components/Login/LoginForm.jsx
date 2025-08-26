import React, { useState } from 'react';
import { Box, Stack, Typography, TextField, Button, FormControlLabel, Checkbox, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { setAutoSession } from '../../utils/authUtils';
import AutoTokenManager from '../../utils/autoTokenUtils';
import api from '../../services/api';

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

const PasswordLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#121927',
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

const OptionsRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
}));

const RememberMeContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(0.75)
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '2px',
  border: '1px solid #A0A0AA',
  padding: 0,
  '&.Mui-checked': {
    color: '#0B91D6'
  }
}));

const RememberMeText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const ForgotPasswordLink = styled(Link)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#0B91D6',
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    color: '#0277BD'
  }
}));

const LoginButton = styled(Button)(({ theme }) => ({
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

const LoginForm = ({ onGoogleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return email.trim() !== '' && password.trim() !== '' && validateEmail(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isFormValid()) {
      setError('Please enter valid email and password');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/customer/auth/login', {
        email,
        password,
        account_type: 'manual'
      });

      console.log('🔐 Login response received:', response);

      // Enhanced session handling with auto token management
      let userData = response.data || response;
      
      // Handle different response structures
      if (userData.user) {
        // If user data is nested, extract it but preserve tokens at root level
        userData = {
          ...userData.user,
          token: userData.token || userData.user.token,
          refresh_token: userData.refresh_token || userData.user.refresh_token
        };
      }

      // Use enhanced auto session setup
      const normalizedSession = setAutoSession(userData);
      
      // Legacy storage for backward compatibility
      if (userData.token) {
        localStorage.setItem('authToken', userData.token);
      }
      localStorage.setItem('userData', JSON.stringify(userData));

      // Start automatic token management
      console.log('🚀 Starting auto token management...');
      AutoTokenManager.startAutoRefresh();
      
      // Log token status for debugging
      const tokenStatus = AutoTokenManager.getTokenStatus();
      console.log('🔍 Token status after login:', tokenStatus);

      setTimeout(() => {
        navigate('/dashboard');
      }, 100);

    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Stack spacing={3}>
        <Box>
          <EmailLabel>Email*</EmailLabel>
          <StyledTextField
            fullWidth
            placeholder="Enter contact number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email !== '' && !validateEmail(email)}
          />
        </Box>

        <Box>
          <PasswordLabel>Password*</PasswordLabel>
          <StyledTextField
            fullWidth
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </Stack>

      <OptionsRow>
        <RememberMeContainer>
          <StyledCheckbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <RememberMeText>Remember me</RememberMeText>
        </RememberMeContainer>

        <ForgotPasswordLink onClick={() => navigate('/forgot-password')}>
          Forgot Password?
        </ForgotPasswordLink>
      </OptionsRow>

      {error && (
        <Typography color="error" variant="body2" textAlign="center">
          {error}
        </Typography>
      )}

      <LoginButton
        onClick={handleLogin}
        disabled={!isFormValid() || loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </LoginButton>
    </FormContainer>
  );
};

export default LoginForm;