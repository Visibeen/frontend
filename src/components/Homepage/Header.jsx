import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import UserAccountDropdown from '../UserAccountDropdown/UserAccountDropdown';
import { getSession } from '../../utils/authUtils';
import logo from '../../assets/VisibeenLogo.png';

const HeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#ffffff',
  boxShadow: '0px 4px 9.7px rgba(0, 0, 0, 0.10)',
  padding: '20px 0',
  position: 'sticky',
  top: 0,
  zIndex: 1000
}));

const HeaderContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '0 66px'
}));

const Logo = styled('img')(({ theme }) => ({
  width: '119px',
  height: '40px',
  cursor: 'pointer'
}));

const Navigation = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '60px',
  alignItems: 'center'
}));

const NavLink = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  color: '#121927',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: '#0B91D6'
  },
  '&.active': {
    color: '#0B91D6'
  }
}));

const LoginButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #0B91D6 0%, #EF232A 100%)',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  width: '150px',
  height: '45px',
  textTransform: 'none',
  padding: '12px 34px',
  borderRadius: '25px',
  minWidth: '68px',
  '&:hover': {
    background: 'linear-gradient(90deg, #0980C2 0%, #DC2626 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(11, 145, 214, 0.3)'
  },
  transition: 'all 0.2s ease'
}));

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = getSession();
    setIsLoggedIn(!!session && !!session.token);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo src={logo} alt="Visibeen" onClick={handleLogoClick} />
        
        <Navigation>
          <NavLink className="active">Home</NavLink>
          <NavLink>Features</NavLink>
          <NavLink>Pricing</NavLink>
          <NavLink>Blog</NavLink>
        </Navigation>

        {isLoggedIn ? (
          <UserAccountDropdown />
        ) : (
          <LoginButton onClick={handleLoginClick}>
            Login
          </LoginButton>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;