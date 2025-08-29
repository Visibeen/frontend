import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '600px',
  background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden'
}));

const HeroContent = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  textAlign: 'center',
  gap: '20px',
  maxWidth: '800px',
  padding: '0 20px',
  zIndex: 2
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '57px',
  fontWeight: 700,
  letterSpacing: '-1.10px',
  lineHeight: '60px',
  color: '#0d2b23',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    lineHeight: '45px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '32px',
    lineHeight: '38px'
  }
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  letterSpacing: '0.10px',
  lineHeight: '27.54px',
  color: '#797c7f',
  maxWidth: '600px'
}));

const FloatingImage = styled('img')(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  border: '4px solid #ffffff',
  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
  zIndex: 1
}));

const FloatingImage1 = styled(FloatingImage)(({ theme }) => ({
  width: '80px',
  height: '80px',
  top: '20%',
  right: '15%',
  [theme.breakpoints.down('md')]: {
    width: '60px',
    height: '60px',
    right: '10%'
  }
}));

const FloatingImage2 = styled(FloatingImage)(({ theme }) => ({
  width: '60px',
  height: '60px',
  bottom: '25%',
  left: '10%',
  [theme.breakpoints.down('md')]: {
    width: '50px',
    height: '50px',
    left: '5%'
  }
}));

const FloatingImage3 = styled(FloatingImage)(({ theme }) => ({
  width: '70px',
  height: '70px',
  top: '60%',
  right: '25%',
  [theme.breakpoints.down('md')]: {
    width: '55px',
    height: '55px',
    right: '20%'
  }
}));

const HeroSection = ({ businessInfo }) => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>
          {businessInfo?.heroTitle || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
        </HeroTitle>
        <HeroSubtitle>
          {businessInfo?.heroSubtitle || 'Professional automotive services you can trust'}
        </HeroSubtitle>
      </HeroContent>
      
      {businessInfo?.heroImages?.[0] && (
        <>
          <FloatingImage1
            src={businessInfo.heroImages[0]}
            alt="Hero floating image 1"
          />
          <FloatingImage2
            src={businessInfo.heroImages[0]}
            alt="Hero floating image 2"
          />
          <FloatingImage3
            src={businessInfo.heroImages[0]}
            alt="Hero floating image 3"
          />
        </>
      )}
    </HeroContainer>
  );
};

export default HeroSection;