import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const WelcomeContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '6px',
  marginBottom: '40px'
}));

const LogoContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '36px',
  marginBottom: '6px'
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#121927'
}));

const CompanyName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '32px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const LogoImage = styled('img')(({ theme }) => ({
  width: '126px',
  height: '42px'
}));

const WelcomeSection = ({ userInfo }) => {
  return (
    <WelcomeContainer>
      <LogoContainer>
        <LogoImage src="/images/visibeen-logo.png" alt="Visibeen" />
      </LogoContainer>
      <WelcomeText>Welcome</WelcomeText>
      <CompanyName>{userInfo?.businessName || 'E2E Digitech Pvt Ltd'}</CompanyName>
    </WelcomeContainer>
  );
};

export default WelcomeSection;