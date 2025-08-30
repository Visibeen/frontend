import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import FeatureCard from './FeatureCard';

const AboutContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 4,
  padding: '60px 30px',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    direction: 'column',
    spacing: 3
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '576px'
}));

const AboutImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '421px',
  objectFit: 'cover',
  borderRadius: '8px'
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '684px',
  backgroundColor: '#222838',
  padding: '50px 40px',
  borderRadius: '8px',
  [theme.breakpoints.down('md')]: {
    padding: '30px 20px'
  }
}));

const SectionLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '22px',
  fontWeight: 400,
  lineHeight: '26px',
  textTransform: 'capitalize',
  color: '#ffffff',
  marginBottom: '10px'
}));

const AboutTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '45px',
  fontWeight: 500,
  lineHeight: '48px',
  textTransform: 'capitalize',
  color: '#ffffff',
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    fontSize: '35px',
    lineHeight: '38px'
  }
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '22px',
  color: '#ffffff',
  marginBottom: '40px'
}));

const ViewMoreButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  textTransform: 'capitalize',
  color: '#ffffff',
  backgroundColor: 'transparent',
  border: '1px solid #ffffff',
  padding: '8px 20px',
  borderRadius: '6px',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
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
      
      <ContentContainer>
        <SectionLabel>
          {aboutUs?.sectionLabel}
        </SectionLabel>
        <AboutTitle>
          {aboutUs?.title}
        </AboutTitle>
        <AboutDescription>
          {aboutUs?.description}
        </AboutDescription>
        
        <Stack spacing={2}>
          {aboutUs?.features?.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </Stack>
        
        <ViewMoreButton>
          view more
        </ViewMoreButton>
      </ContentContainer>
    </AboutContainer>
  );
};

export default AboutSection;