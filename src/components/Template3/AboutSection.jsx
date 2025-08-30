import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import GlobalServiceIcon from '../icons/GlobalServiceIcon';
import LocalServiceIcon from '../icons/LocalServiceIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';

const AboutContainer = styled(Box)(({ theme }) => ({
  padding: '80px 320px',
  backgroundColor: '#ffffff'
}));

const AboutContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px',
  alignItems: 'flex-start'
}));

const LeftContent = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '19px'
}));

const SectionTag = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '18.20px',
  textTransform: 'uppercase',
  color: '#565969',
  display: 'flex',
  alignItems: 'center',
  gap: '17px',
  '&::before': {
    content: '""',
    width: '17px',
    height: '14px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px'
  }
}));

const AboutTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '48px',
  fontWeight: 700,
  lineHeight: '57.60px',
  textTransform: 'capitalize',
  color: '#140a09'
}));

const TitleHighlight = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '25.50px',
  color: '#565969'
}));

const FeatureItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '30px',
  alignItems: 'flex-start'
}));

const FeatureContent = styled(Stack)(({ theme }) => ({
  gap: '0.25px'
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: '36.40px',
  color: '#140a09'
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '25.50px',
  color: '#565969'
}));

const CTAButton = styled(Button)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 700,
  textTransform: 'capitalize',
  color: '#ffffff',
  backgroundColor: 'transparent',
  padding: '8px 16px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
}));

const RightContent = styled(Stack)(({ theme }) => ({
  position: 'relative',
  alignItems: 'center'
}));

const ExperienceBox = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  top: '50px',
  right: '50px',
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '15px',
  border: '1px solid rgba(156, 196, 207, 0.25)',
  alignItems: 'center',
  gap: '-0.49px',
  zIndex: 2,
  minWidth: '152px'
}));

const ExperienceYears = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '48px',
  fontWeight: 700,
  lineHeight: '57.60px',
  color: '#0b91d6'
}));

const ExperienceText = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '18.20px',
  textTransform: 'uppercase',
  color: '#565969',
  textAlign: 'center'
}));

const AboutImage = styled('img')(({ theme }) => ({
  width: '298px',
  height: '629px',
  borderRadius: '15px',
  objectFit: 'cover'
}));

const AboutSection = ({ aboutUs }) => {
  const getFeatureIcon = (iconType) => {
    switch (iconType) {
      case 'global':
        return <GlobalServiceIcon width={27} height={27} color="#0b91d6" />;
      case 'local':
        return <LocalServiceIcon width={32} height={28} color="#0b91d6" />;
      default:
        return <GlobalServiceIcon width={27} height={27} color="#0b91d6" />;
    }
  };

  return (
    <AboutContainer>
      <AboutContent>
        <LeftContent>
          <SectionTag>
            {aboutUs?.sectionTag || 'Who we are'}
          </SectionTag>
          
          <AboutTitle>
            {aboutUs?.title?.split('And ')[0] || 'We are global Logistic'}
            <br />
            <TitleHighlight>And </TitleHighlight>
            {aboutUs?.title?.split('And ')[1] || 'Transport Agency'}
          </AboutTitle>
          
          <AboutDescription>
            {aboutUs?.description || 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever se'}
          </AboutDescription>
          
          {aboutUs?.features?.map((feature, index) => (
            <FeatureItem key={index}>
              {getFeatureIcon(feature.icon)}
              <FeatureContent>
                <FeatureTitle>
                  {feature.title}
                </FeatureTitle>
                <FeatureDescription>
                  {feature.description}
                </FeatureDescription>
              </FeatureContent>
            </FeatureItem>
          ))}
          
          <CTAButton>
            {aboutUs?.ctaText || 'More About Us'}
            <ArrowRightIcon width={12} height={12} color="#ffffff" />
          </CTAButton>
        </LeftContent>
        
        <RightContent>
          <AboutImage
            src={aboutUs?.image || '/images/template3-about-bg.png'}
            alt="About Us"
          />
          <ExperienceBox>
            <ExperienceYears>
              {aboutUs?.experienceYears || '25+'}
            </ExperienceYears>
            <ExperienceText>
              {aboutUs?.experienceText || 'Years of experience'}
            </ExperienceText>
          </ExperienceBox>
        </RightContent>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutSection;