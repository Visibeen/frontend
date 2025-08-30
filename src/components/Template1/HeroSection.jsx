import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navigation from './Navigation';

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '700px',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const HeroContent = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  textAlign: 'center',
  gap: '25px',
  maxWidth: '944px',
  padding: '0 20px'
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '60px',
  fontWeight: 500,
  letterSpacing: '1px',
  lineHeight: '80px',
  textTransform: 'capitalize',
  color: '#ffffff',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    lineHeight: '50px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '32px',
    lineHeight: '40px'
  }
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Source Sans Pro, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  letterSpacing: '1px',
  textTransform: 'capitalize',
  color: '#ffffff',
  maxWidth: '736px'
}));

const HeroCTA = styled(Button)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'uppercase',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  padding: '15px 30px',
  borderRadius: '4px',
  marginTop: '25px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const HeroSection = ({ businessInfo }) => {
  return (
    <HeroContainer>
      <Navigation />
      <HeroContent>
        <HeroTitle>
          {businessInfo?.heroTitle || 'Lorem ipsum dolor sit amet, consectetur eli'}
        </HeroTitle>
        <HeroSubtitle>
          {businessInfo?.heroSubtitle || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incid'}
        </HeroSubtitle>
        <HeroCTA variant="contained">
          {businessInfo?.ctaText || 'BOOK Now'}
        </HeroCTA>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;