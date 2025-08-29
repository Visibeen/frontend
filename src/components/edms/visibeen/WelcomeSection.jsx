import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAccount } from './AccountContext';

const WelcomeContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: 6,
  padding: '40px 0'
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  marginBottom: 36
}));

const WelcomeSection = () => {
  const { accountInfo } = useAccount();

  return (
    <WelcomeContainer>
      <LogoContainer>
        <img 
          src="/images/visibeen-logo.png" 
          alt="VISIBEEN Logo" 
          width={126}
          height={42}
        />
      </LogoContainer>
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'text.primary',
          fontWeight: 500,
          fontSize: 16
        }}
      >
        Welcome
      </Typography>
      <Typography 
        variant="h2" 
        sx={{ 
          color: 'primary.main',
          fontWeight: 600,
          fontSize: 32
        }}
      >
        {accountInfo.business_name || 'E2E Digitech Pvt Ltd'}
      </Typography>
    </WelcomeContainer>
  );
};

export default WelcomeSection;