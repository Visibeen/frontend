import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhoneIcon from './icons/PhoneIcon';

const HeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#ffffff',
  padding: '20px 96px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('md')]: {
    padding: '16px 24px'
  }
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 700,
  letterSpacing: '-0.32px',
  color: theme.palette.primary.main,
  border: `2px solid ${theme.palette.primary.main}`,
  padding: '8px 16px',
  borderRadius: '4px'
}));

const MenuContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const MenuItem = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#000E24',
  cursor: 'pointer',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main
  }
}));

const PhoneContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '10px',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  padding: '8px 16px',
  borderRadius: '4px'
}));

const PhoneText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  letterSpacing: '-0.28px',
  color: '#ffffff'
}));

const NavigationHeader = ({ businessInfo, navigation }) => {
  const { name, phoneNumber } = businessInfo || {};
  const { menuItems } = navigation || {};

  return (
    <HeaderContainer>
      <Logo>{name || 'LOGO'}</Logo>
      
      <MenuContainer>
        {menuItems?.map((item, index) => (
          <MenuItem key={index}>{item}</MenuItem>
        ))}
        
        <PhoneContainer>
          <PhoneIcon width={16} height={16} color="#ffffff" />
          <PhoneText>{phoneNumber || '+ (100) 234-5678'}</PhoneText>
        </PhoneContainer>
      </MenuContainer>
    </HeaderContainer>
  );
};

export default NavigationHeader;