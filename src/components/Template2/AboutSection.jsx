import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckmarkIcon from '../icons/CheckmarkIcon';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '80px 315px',
  backgroundColor: '#ffffff'
}));

const AboutContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '50px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '40px'
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '529px'
}));

const AboutImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '646px',
  objectFit: 'cover',
  borderRadius: '8px'
}));

const TextContent = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '20px',
  maxWidth: '615px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '1.80px',
  textTransform: 'uppercase',
  color: '#f4762a',
  marginBottom: '10px'
}));

const AboutHeading = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '57px',
  fontWeight: 700,
  letterSpacing: '-1.10px',
  lineHeight: '60px',
  color: '#0d2b23',
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    lineHeight: '45px'
  }
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  letterSpacing: '0.10px',
  lineHeight: '27.54px',
  color: '#797c7f',
  marginBottom: '30px'
}));

const FeaturesList = styled(Stack)(({ theme }) => ({
  gap: '15px',
  marginBottom: '30px'
}));

const FeatureItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px'
}));

const FeatureText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  letterSpacing: '0.10px',
  lineHeight: '23.40px',
  color: '#797c7f'
}));

const CTAButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '1.30px',
  textTransform: 'uppercase',
  backgroundColor: '#ffffff',
  color: '#0d2b23',
  border: '2px solid #0d2b23',
  padding: '12px 24px',
  borderRadius: '4px',
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: '#0d2b23',
    color: '#ffffff'
  }
}));

const AboutSection = ({ aboutUs }) => {
  return (
    <SectionContainer>
      <AboutContent>
        <ImageContainer>
          <AboutImage
            src={aboutUs?.image || '/images/automotive-hero.jpg'}
            alt="About Us"
          />
        </ImageContainer>
        
        <TextContent>
          <SectionTitle>
            {aboutUs?.title || 'who we are'}
          </SectionTitle>
          
          <AboutHeading>
            {aboutUs?.heading || 'Lorem ipsum dolor sit amet,'}
          </AboutHeading>
          
          <AboutDescription>
            {aboutUs?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
          </AboutDescription>
          
          <FeaturesList>
            {aboutUs?.features?.map((feature, index) => (
              <FeatureItem key={index}>
                <CheckmarkIcon width={6} height={6} color="#f4762a" />
                <FeatureText>{feature}</FeatureText>
              </FeatureItem>
            )) || [
              'Lorem ipsum dolor sit',
              'Lorem ipsum dolor sit',
              'Lorem ipsum dolor sit'
            ].map((feature, index) => (
              <FeatureItem key={index}>
                <CheckmarkIcon width={6} height={6} color="#f4762a" />
                <FeatureText>{feature}</FeatureText>
              </FeatureItem>
            ))}
          </FeaturesList>
          
          <CTAButton variant="outlined">
            {aboutUs?.ctaText || 'Info About Us'}
          </CTAButton>
        </TextContent>
      </AboutContent>
    </SectionContainer>
  );
};

export default AboutSection;