import React from 'react';
import { AppBar, Toolbar, Box, Stack, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  padding: '10px 0',
  position: 'static'
}));

const Logo = styled('img')(({ theme }) => ({
  height: '29px',
  width: '70px',
  objectFit: 'contain'
}));

const NavButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#171717',
  textTransform: 'none',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'rgba(23, 23, 23, 0.04)'
  }
}));

const NavigationHeader = ({ businessInfo, navigation }) => {
  return (
    <StyledAppBar>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 8 } }}>
        <Logo src={businessInfo?.logo} alt={businessInfo?.name} />
        
        <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {navigation?.menuItems?.map((item, index) => (
            <NavButton key={index}>
              {item}
            </NavButton>
          ))}
        </Stack>
        
        <Box />
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavigationHeader;