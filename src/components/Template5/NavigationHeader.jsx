import React from 'react';
import { AppBar, Toolbar, Box, Stack, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhoneIcon from '../icons/PhoneIcon';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fcf9f0',
  boxShadow: 'none',
  padding: '10px 0',
  position: 'static'
}));

const Logo = styled('img')(({ theme }) => ({
  height: '58px',
  width: '158px',
  objectFit: 'contain'
}));

const NavButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 300,
  lineHeight: '22px',
  textTransform: 'capitalize',
  color: '#ffffff',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
}));

const PhoneNumber = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
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
        
        <PhoneNumber>
          <PhoneIcon width={18} height={18} color="#ffffff" />
          {businessInfo?.phoneNumber}
        </PhoneNumber>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavigationHeader;