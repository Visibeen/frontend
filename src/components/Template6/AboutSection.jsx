import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const SectionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '60px 64px',
  backgroundColor: '#ffffff',
  [theme.breakpoints.down('md')]: {
    padding: '40px 24px'
  }
}));

const HeaderContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '15px',
  marginBottom: '60px'
}));

const SubTitleContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px'
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  letterSpacing: '-0.40px',
  lineHeight: '24px',
  textTransform: 'capitalize',
  color: theme.palette.primary.main
}));

const Divider = styled(Box)(({ theme }) => ({
  width: '33px',
  height: '4px',
  backgroundColor: theme.palette.primary.main
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '40px',
  fontWeight: 700,
  letterSpacing: '-0.80px',
  lineHeight: '48px',
  color: theme.palette.secondary.main,
  textAlign: 'center'
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '40px',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '415px',
  height: '475px',
  borderRadius: '4px',
  overflow: 'hidden',
  flexShrink: 0,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: '415px',
    height: '300px'
  }
}));

const AboutImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));

const TextContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '20px',
  maxWidth: '697px'
}));

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  letterSpacing: '-0.36px',
  lineHeight: '28px',
  color: theme.palette.secondary.main,
  whiteSpace: 'pre-line'
}));

const FeaturesList = styled(Stack)(({ theme }) => ({
  gap: '8px',
  marginTop: '16px'
}));

const FeatureItem = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  letterSpacing: '-0.36px',
  lineHeight: '28px',
  color: theme.palette.secondary.main
}));

const AboutSection = ({ aboutUs }) => {
  const { 
    sectionLabel, 
    title, 
    description, 
    features, 
    closingText, 
    image 
  } = aboutUs || {};

  return (
    <SectionContainer>
      <HeaderContainer>
        <SubTitleContainer>
          <SubTitle>{sectionLabel || 'About Us'}</SubTitle>
          <Divider />
        </SubTitleContainer>
        
        <MainTitle>
          {title || 'We Are Experts in Plumbing Service'}
        </MainTitle>
      </HeaderContainer>

      <ContentContainer>
        <ImageContainer>
          <AboutImage 
            src={image || '/images/template6-about-plumber.jpg'} 
            alt="Professional plumber at work"
          />
        </ImageContainer>

        <TextContainer>
          <Description>
            {description || "At [Your Plumbing Company Name], we're not just in the business of fixing pipes — we're in the business of building trust.\n\nFounded with a commitment to quality, reliability, and customer satisfaction, our team of licensed plumbing professionals has been proudly serving homes and businesses across [City/Region] for over [X] years. Whether it's a dripping faucet, a burst pipe, or a full plumbing overhaul, we handle every job — big or small — with the same care and attention to detail.\n\nWe know plumbing issues can be stressful, which is why we offer:"}
          </Description>

          {features && (
            <FeaturesList>
              {features.map((feature, index) => (
                <FeatureItem key={index}>
                  {feature}
                </FeatureItem>
              ))}
            </FeaturesList>
          )}

          {closingText && (
            <Description>
              {closingText}
            </Description>
          )}
        </TextContainer>
      </ContentContainer>
    </SectionContainer>
  );
};

export default AboutSection;