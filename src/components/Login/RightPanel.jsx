import React from 'react';
import { Box, Stack, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import GoogleButton from './GoogleButton';
import FormDivider from './FormDivider';
import LoginForm from './LoginForm';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { setSession } from '../../utils/authUtils';
import api from '../../services/api';
import tokenManager from '../../auth/TokenManager';

const RightPanelContainer = styled(Box)(({ theme }) => ({
  width: '50%',
  minHeight: '100vh',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(5),
  position: 'relative'
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(3.25),
  zIndex: 1,
  position: 'relative'
}));

const WelcomeHeading = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '26px',
  fontWeight: 600,
  color: '#121927',
  textAlign: 'center',
  marginBottom: theme.spacing(1.75)
}));

const WelcomeSubtext = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927',
  textAlign: 'center'
}));

const RegisterText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927',
  textAlign: 'center'
}));

const RegisterLink = styled(Link)(({ theme }) => ({
  color: '#0B91D6',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
    color: '#0277BD'
  }
}));

const RightPanel = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      // Configure Google provider with required scopes
      provider.addScope('openid');
      provider.addScope('https://www.googleapis.com/auth/userinfo.email');
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
      provider.addScope('https://www.googleapis.com/auth/business.manage');
      provider.setCustomParameters({ 
        prompt: 'consent', 
        access_type: 'offline', 
        include_granted_scopes: 'true' 
      });

      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const googleAccessToken = credential?.accessToken || '';

      // Extract user information
      const firebaseUser = result?.user || {};
      const derivedEmail = firebaseUser.email || '';
      const derivedFullName = firebaseUser.displayName || '';

      if (!googleAccessToken) {
        throw new Error('Google access token was not returned. Please try again and accept permissions.');
      }

      // Store token for later use
      try {
        sessionStorage.setItem('googleAccessToken', googleAccessToken);
        localStorage.setItem('googleAccessToken', googleAccessToken);
      } catch (_) {}
      if (googleAccessToken) {
        tokenManager.set('google', { access_token: googleAccessToken, token_type: 'Bearer' });
      }

      // Call backend API
      const data = await api.post('/customer/auth/google-login', {
        email: derivedEmail,
        googleEmail: derivedEmail,
        full_name: derivedFullName,
        account_type: 'google',
        googleAccessToken,
        idToken: credential?.idToken || undefined,
        access_token: googleAccessToken,
        id_token: credential?.idToken || undefined,
        firebase_uid: firebaseUser?.uid || undefined,
        providerId: (firebaseUser?.providerData && firebaseUser.providerData[0]?.providerId) || 'google.com',
        emailVerified: !!firebaseUser?.emailVerified
      });

      // Store user data in session
      setSession(data?.data || data?.user || data);
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Google sign-in popup closed.');
      } else {
        console.error('Google Login Failed:', error?.message || error);
      }
    }
  };

  return (
    <RightPanelContainer>
      <ContentContainer>
        <Stack spacing={1.75} alignItems="center">
          <WelcomeHeading>Welcome to Visibeen</WelcomeHeading>
          <WelcomeSubtext>Start managing your system faster and better!</WelcomeSubtext>
        </Stack>

        <GoogleButton onClick={handleGoogleLogin} />
        
        <FormDivider />
        
        <LoginForm onGoogleLogin={handleGoogleLogin} />
        
        <RegisterText>
          Don't have an account?{' '}
          <RegisterLink onClick={() => navigate('/register')}>
            Register now
          </RegisterLink>
        </RegisterText>
      </ContentContainer>
    </RightPanelContainer>
  );
};

export default RightPanel;