import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '40px'
}));

const LogoImage = styled('img')(({ theme }) => ({
  width: '88px',
  height: '88px',
  objectFit: 'contain'
}));

const UpdateText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#0B91D6',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

const LogoUploadSection = ({ onLogoClick }) => {
  return (
    <LogoContainer>
      <LogoImage 
        src="/assets/ibe-logo-update.svg" 
        alt="Business Logo"
      />
      <UpdateText onClick={onLogoClick}>
        Update Logo
      </UpdateText>
    </LogoContainer>
  );
};

export default LogoUploadSection;