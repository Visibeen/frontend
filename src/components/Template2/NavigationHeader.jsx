import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: '20px 315px',
  borderBottom: '1px solid #f0f0f0'
}));

const HeaderContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const Logo = styled('img')(({ theme }) => ({
  height: '35px',
  width: 'auto'
}));

const Navigation = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '30px'
}));

const NavItem = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  color: '#0d2b23',
  cursor: 'pointer',
  position: 'relative',
  '&:hover': {
    color: theme.palette.primary.main
  },
  '&.active': {
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: '#0d2b23'
    }
  }
}));

const CTAButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '1.30px',
  textTransform: 'uppercase',
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark
  }
}));

const NavigationHeader = ({ businessInfo, navigation }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo
          src={businessInfo?.logo || '/images/template2-logo.png'}
          alt={businessInfo?.name || 'Logo'}
        />
        
        <Navigation>
          {navigation?.menuItems?.map((item, index) => (
            <NavItem key={index} className={index === 0 ? 'active' : ''}>
              {item}
            </NavItem>
          ))}
        </Navigation>
        
        <CTAButton variant="contained">
          {businessInfo?.ctaText || "let's talk"}
        </CTAButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default NavigationHeader;