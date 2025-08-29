import React from 'react';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '30px',
  padding: '38px 0',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10
}));

const NavItem = styled(Typography)(({ theme }) => ({
  fontFamily: 'Source Sans Pro, sans-serif',
  fontSize: '15.5px',
  fontWeight: 400,
  textTransform: 'capitalize',
  color: '#ffffff',
  cursor: 'pointer',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main
  }
}));

const Navigation = ({ menuItems = ['Home', 'Services', 'About Us', 'Blog', 'Contact'] }) => {
  return (
    <NavigationContainer>
      {menuItems.map((item, index) => (
        <NavItem key={index}>
          {item}
        </NavItem>
      ))}
    </NavigationContainer>
  );
};

export default Navigation;