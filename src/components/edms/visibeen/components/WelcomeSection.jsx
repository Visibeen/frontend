import React from 'react';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const WelcomeSectionContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '6px',
  marginBottom: '40px'
}));

const LogoContainer = styled(Stack)(({ theme }) => ({
  gap: '36px',
  alignItems: 'center',
  marginBottom: '6px'
}));

const VisibeenLogo = styled('img')(({ theme }) => ({
  width: '126px',
  height: '42px',
  objectFit: 'cover'
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

const WelcomeSection = () => {
  return (
    <WelcomeSectionContainer>
      <LogoContainer>
        <VisibeenLogo 
          src="/images/visibeen-logo.png" 
          alt="Visibeen Logo" 
        />
        <WelcomeText>Welcome</WelcomeText>
      </LogoContainer>
      <CompanyName>E2E Digitech Pvt Ltd</CompanyName>
    </WelcomeSectionContainer>
  );
};

export default WelcomeSection;