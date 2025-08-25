import React, { useRef } from 'react';
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

const LogoUploadSection = ({ onLogoClick, onFileSelected, logoSrc }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (onLogoClick) onLogoClick();
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (onFileSelected) onFileSelected(file);
  };

  return (
    <LogoContainer>
      <LogoImage 
        src={logoSrc || '/assets/ibe-logo-update.svg'} 
        alt="Business Logo"
      />
      <UpdateText onClick={handleClick}>
        Update Logo
      </UpdateText>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </LogoContainer>
  );
};

export default LogoUploadSection;