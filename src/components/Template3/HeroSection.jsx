import React from 'react';
import { Box, Typography, Stack, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '../icons/ArrowRightIcon';

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '775px',
  backgroundColor: 'rgba(20, 10, 9, 0.82)',
  backgroundImage: 'url(/images/template3-hero-bg.svg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  padding: '0 320px'
}));

const HeroContent = styled(Stack)(({ theme }) => ({
  gap: '30px',
  maxWidth: '648px',
  zIndex: 2
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '64px',
  fontWeight: 700,
  lineHeight: '70.40px',
  textTransform: 'capitalize',
  color: '#ffffff'
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '64px',
  fontWeight: 700,
  lineHeight: '70.40px',
  textTransform: 'capitalize',
  color: '#0b91d6'
}));

const HeroTagline = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '64px',
  fontWeight: 700,
  lineHeight: '70.40px',
  textTransform: 'capitalize',
  color: '#ffffff'
}));

const HeroDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '25.50px',
  color: '#ffffff'
}));

const CTAButton = styled(Button)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 700,
  textTransform: 'capitalize',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  border: '1px solid rgba(156, 196, 207, 0.25)',
  width: '100%',
  margin: '20px 0'
}));

const HeroSection = ({ businessInfo }) => {
  return (
    <HeroContainer>
      <HeroContent>
        <Stack gap="-0.60px">
          <HeroTitle>
            {businessInfo?.heroTitle || 'We are provide'}
          </HeroTitle>
          <HeroSubtitle>
            {businessInfo?.heroSubtitle || 'Lorem ipsum dolor'}
          </HeroSubtitle>
          <HeroTagline>
            {businessInfo?.heroTagline || 'Services For You'}
          </HeroTagline>
        </Stack>
        
        <StyledDivider />
        
        <HeroDescription>
          {businessInfo?.heroDescription || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'}
        </HeroDescription>
        
        <CTAButton variant="contained">
          {businessInfo?.ctaText || 'Explore more'}
          <ArrowRightIcon width={12} height={12} color="#ffffff" />
        </CTAButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;