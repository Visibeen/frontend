import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '80px 20px',
  backgroundColor: '#ffffff'
}));

const AboutContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '50px',
  maxWidth: '1200px',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '40px'
  }
}));

const TextContent = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '20px',
  maxWidth: '458px'
}));

const AboutTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '30px',
  fontWeight: 700,
  letterSpacing: '1px',
  lineHeight: '33px',
  textTransform: 'capitalize',
  color: '#333333'
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Source Sans Pro, sans-serif',
  fontSize: '15.5px',
  fontWeight: 400,
  lineHeight: '24px',
  color: '#666666'
}));

const AboutCTA = styled(Button)(({ theme }) => ({
  fontFamily: 'Source Sans Pro, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'uppercase',
  color: '#ffffff',
  backgroundColor: theme.palette.primary.main,
  padding: '12px 24px',
  borderRadius: '4px',
  alignSelf: 'flex-start',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '458px'
}));

const AboutImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '564px',
  objectFit: 'cover',
  borderRadius: '4px'
}));

const AboutSection = ({ aboutUs }) => {
  return (
    <SectionContainer>
      <AboutContent>
        <TextContent>
          <AboutTitle>
            {aboutUs?.title || 'About Us'}
          </AboutTitle>
          <AboutDescription>
            {aboutUs?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus, nunc consequat cursus cursus, urna diam euismod arcu, et iaculis turpis sapien quis velit. Nam maximus lectus eu consequat pulvinar. Duis porttitor euismod.'}
          </AboutDescription>
          <AboutDescription>
            {aboutUs?.additionalText || 'Donec nulla est, rutrum in dui eget, ultricies mollis leo. Duis non diam sodales, tristique enim vitae, lacinia mauris.'}
          </AboutDescription>
          <AboutCTA variant="contained">
            {aboutUs?.ctaText || 'Read more'}
          </AboutCTA>
        </TextContent>
        
        <ImageContainer>
          <AboutImage
            src={aboutUs?.image || '/images/medical-team.jpg'}
            alt="About Us"
          />
        </ImageContainer>
      </AboutContent>
    </SectionContainer>
  );
};

export default AboutSection;