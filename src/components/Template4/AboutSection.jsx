import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const AboutContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 4,
  padding: '40px 30px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    direction: 'column',
    spacing: 3
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '610px'
}));

const AboutImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '610px',
  objectFit: 'cover',
  borderRadius: '16px'
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  maxWidth: '610px',
  spacing: 2,
  paddingLeft: '40px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0,
    textAlign: 'center'
  }
}));

const SectionLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  letterSpacing: '0.15px',
  textTransform: 'uppercase',
  color: '#efb817',
  marginBottom: '10px'
}));

const AboutTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '64px',
  fontWeight: 500,
  letterSpacing: '-2.24px',
  lineHeight: '70.40px',
  color: '#171717',
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    lineHeight: '44px'
  }
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '29.70px',
  color: '#171717'
}));

const AboutSection = ({ aboutUs }) => {
  return (
    <AboutContainer 
      direction={{ xs: 'column', md: 'row' }} 
      spacing={{ xs: 3, md: 4 }}
    >
      <ImageContainer>
        <AboutImage src={aboutUs?.image} alt="About us" />
      </ImageContainer>
      
      <ContentContainer spacing={2}>
        <SectionLabel>
          {aboutUs?.sectionLabel}
        </SectionLabel>
        <AboutTitle>
          {aboutUs?.title}
        </AboutTitle>
        <AboutDescription>
          {aboutUs?.description}
        </AboutDescription>
      </ContentContainer>
    </AboutContainer>
  );
};

export default AboutSection;