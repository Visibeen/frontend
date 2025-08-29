import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: '20px 320px',
  minHeight: '118px',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #f0f0f0'
}));

const HeaderContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
}));

const Logo = styled('img')(({ theme }) => ({
  height: '47px',
  width: 'auto'
}));

const Navigation = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '40px',
  flexWrap: 'wrap'
}));

const NavItem = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 700,
  color: '#140a09',
  cursor: 'pointer',
  textTransform: 'capitalize',
  position: 'relative',
  '&:hover': {
    color: theme.palette.primary.main
  },
  '&.active': {
    color: theme.palette.primary.main,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const NavigationHeader = ({ businessInfo, navigation }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo
          src={businessInfo?.logo || '/images/template3-logo.png'}
          alt={businessInfo?.name || 'VISIBEEN'}
        />
        
        <Navigation>
          {navigation?.menuItems?.map((item, index) => (
            <NavItem key={index} className={index === 0 ? 'active' : ''}>
              {item}
            </NavItem>
          ))}
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default NavigationHeader;