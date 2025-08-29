import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '779px',
  borderRadius: '24px',
  margin: '20px 30px',
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
  backgroundColor: 'rgba(34, 40, 49, 0.22)',
  borderRadius: '24px'
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  maxWidth: '1380px',
  padding: '0 20px'
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '90px',
  fontWeight: 500,
  letterSpacing: '-3.15px',
  lineHeight: '99px',
  color: '#ffffff',
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    fontSize: '60px',
    lineHeight: '66px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '40px',
    lineHeight: '44px'
  }
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '28px',
  fontWeight: 400,
  letterSpacing: '-0.70px',
  lineHeight: '42px',
  color: '#ffffff',
  marginBottom: '40px',
  maxWidth: '1104px',
  [theme.breakpoints.down('md')]: {
    fontSize: '20px',
    lineHeight: '30px'
  }
}));

const CTAButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '18px',
  color: '#171717',
  backgroundColor: '#efb817',
  padding: '16px 32px',
  borderRadius: '8px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#d4a315'
  }
}));

const HeroSection = ({ businessInfo }) => {
  return (
    <HeroContainer
      sx={{
        backgroundImage: `url(${businessInfo?.heroBackgroundImage})`
      }}
    >
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