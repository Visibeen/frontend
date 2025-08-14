import React, { useState } from 'react';
import { Box, Stack, Typography, TextField, Button, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { setSession } from '../../utils/authUtils';
import GoogleButton from '../Login/GoogleButton';
import FormDivider from '../Login/FormDivider';

const FormContainer = styled(Stack)(({ theme }) => ({
  width: '416px',
  gap: theme.spacing(3.25)
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#121927',
  marginBottom: theme.spacing(1)
}));

const RequiredLabel = styled(Typography)(({ theme }) => ({
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

const RegisterButton = styled(Button)(({ theme }) => ({
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

const ErrorText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#EF232A',
  textAlign: 'center'
}));

const RegisterForm = () => {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
  });
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!form.full_name || !form.email) {
      return 'Name and email are required.';
    }
    if (!validateEmail(form.email)) {
      return 'Please enter a valid email address.';
    }
    if (!isGoogleSignup) {
      if (!form.phone_number || !form.password) {
        return 'Phone number and password are required.';
      }
      if (form.password.length < 6) {
        return 'Password must be at least 6 characters.';
      }
    }
    return '';
  };

  const isFormValid = () => {
    return form.full_name.trim() !== '' && 
           form.email.trim() !== '' && 
           validateEmail(form.email) &&
           (isGoogleSignup || (form.phone_number.trim() !== '' && form.password.trim() !== '' && form.password.length >= 6));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    const payload = {
      full_name: form.full_name,
      email: form.email,
      phone_number: isGoogleSignup ? undefined : form.phone_number,
      password: isGoogleSignup ? undefined : form.password,
      account_type: isGoogleSignup ? 'google' : 'manual',
    };

    try {
      const res = await fetch('http://52.44.140.230:8089/api/v1/customer/auth/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resText = await res.text();
      let data;
      try {
        data = JSON.parse(resText);
      } catch {
        data = { message: resText };
      }

      if (!res.ok) {
        setError(data.message || 'Signup failed.');
        setIsSubmitting(false);
        return;
      }

      setSession(data.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Register error:', err);
      setError('Server error. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await fetch('http://52.44.140.230:8089/api/v1/customer/auth/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: user.displayName || 'No Name',
          email: user.email,
          account_type: 'google',
        }),
      });

      const resText = await res.text();
      let data;
      try {
        data = JSON.parse(resText);
      } catch {
        data = { message: resText };
      }

      if (res.ok) {
        setSession(data.user);
        navigate('/dashboard');
      } else {
        console.error("Google signup error response:", data);
        setError(data.message || 'Google Signup Failed');
      }
    } catch (err) {
      console.error('Google signup error:', err);
      setError('Google signup failed.');
    }
  };

  return (
    <FormContainer>
      <GoogleButton onClick={handleGoogleRegister} />
      
      <FormDivider />

      {error && <ErrorText>{error}</ErrorText>}

      <Stack spacing={3}>
        <Box>
          <RequiredLabel>Name*</RequiredLabel>
          <StyledTextField
            fullWidth
            placeholder="Name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
        </Box>

        <Box>
          <RequiredLabel>Email Id*</RequiredLabel>
          <StyledTextField
            fullWidth
            type="email"
            placeholder="Email Id"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={form.email !== '' && !validateEmail(form.email)}
          />
        </Box>

        {!isGoogleSignup && (
          <>
            <Box>
              <RequiredLabel>Contact Number*</RequiredLabel>
              <StyledTextField
                fullWidth
                placeholder="Contact Number"
                value={form.phone_number}
                onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
              />
            </Box>

            <Box>
              <RequiredLabel>Password*</RequiredLabel>
              <StyledTextField
                fullWidth
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={form.password !== '' && form.password.length < 6}
              />
            </Box>
          </>
        )}
      </Stack>

      <RegisterButton 
        onClick={handleRegister}
        disabled={!isFormValid() || isSubmitting}
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </RegisterButton>

      <LoginText>
        Have an account?{' '}
        <LoginLink onClick={() => navigate('/')}>
          Login
        </LoginLink>
      </LoginText>
    </FormContainer>
  );
};

export default RegisterForm;