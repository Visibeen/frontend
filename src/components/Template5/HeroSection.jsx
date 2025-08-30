import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '600px',
  backgroundImage: 'url(/images/interior-hero.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden'
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(34, 40, 56, 0.70)'
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  maxWidth: '1140px',
  padding: '0 20px'
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '70px',
  fontWeight: 600,
  lineHeight: '70px',
  textTransform: 'uppercase',
  color: '#ffffff',
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    fontSize: '50px',
    lineHeight: '50px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '35px',
    lineHeight: '35px'
  }
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '22px',
  color: '#ffffff',
  marginBottom: '40px',
  maxWidth: '840px',
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
    lineHeight: '20px'
  }
}));

const CTAButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  textTransform: 'capitalize',
  color: '#ffffff',
  backgroundColor: 'transparent',
  border: '2px solid #ffffff',
  padding: '12px 30px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#ffffff'
  }
}));

const HeroSection = ({ businessInfo }) => {
  return (
    <HeroContainer>
      <Overlay />
      <ContentContainer spacing={3}>
        <HeroTitle>
          {businessInfo?.heroTitle}
        </HeroTitle>
        <HeroSubtitle>
          {businessInfo?.heroSubtitle}
        </HeroSubtitle>
        <Box>
          <CTAButton>
            {businessInfo?.ctaText}
          </CTAButton>
        </Box>
      </ContentContainer>
    </HeroContainer>
  );
};

export default HeroSection;