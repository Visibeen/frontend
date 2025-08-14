import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../../../../assets/VisibeenLogo.png';

const HeaderCard = styled(Box)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  padding: '18px 20px',
  marginBottom: '24px'
}));

const WelcomeContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px'
}));

const LogoImage = styled('img')(({ theme }) => ({
  width: '126px',
  height: '42px',
  objectFit: 'contain'
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#6b7280',
  marginBottom: '2px',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500
}));

const CompanyName = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  color: '#0B91D6',
  fontFamily: 'Inter, sans-serif'
}));

const WelcomeHeader = () => {
  return (
    <HeaderCard>
      <WelcomeContainer direction="row" alignItems="center" spacing={1.5}>
        <LogoImage src={logo} alt="Visibeen Logo" />
        <Box>
          <WelcomeText>Welcome</WelcomeText>
          <CompanyName>E2E Digitech Pvt Ltd</CompanyName>
        </Box>
      </WelcomeContainer>
    </HeaderCard>
  );
};

export default WelcomeHeader;