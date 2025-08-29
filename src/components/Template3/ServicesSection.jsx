import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ServiceCard from './ServiceCard';
import ArrowRightIcon from '../icons/ArrowRightIcon';

const ServicesContainer = styled(Box)(({ theme }) => ({
  padding: '80px 320px',
  backgroundColor: '#ffffff',
  position: 'relative'
}));

const ServicesHeader = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '20px',
  marginBottom: '60px'
}));

const LeftHeader = styled(Stack)(({ theme }) => ({
  gap: '20px',
  maxWidth: '600px'
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

const ServicesTitle = styled(Typography)(({ theme }) => ({
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

const RightHeader = styled(Stack)(({ theme }) => ({
  gap: '20px',
  alignItems: 'flex-end',
  maxWidth: '488px'
}));

const ServicesDescription = styled(Typography)(({ theme }) => ({
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

const ServicesGrid = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '41px',
  justifyContent: 'center',
  flexWrap: 'wrap'
}));

const BackgroundPattern = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
  height: '800px',
  background: 'radial-gradient(70.71% 70.71% at 50.00% 50.00%, #e54530 0.00%, #ffffff 50.00%)',
  zIndex: -1
}));

const ServicesSection = ({ services }) => {
  return (
    <ServicesContainer>
      <BackgroundPattern />
      
      <ServicesHeader>
        <LeftHeader>
          <SectionTag>
            {services?.sectionTag || 'Our Service'}
          </SectionTag>
          
          <ServicesTitle>
            {services?.title || 'Provide Efficient Logistics Solutions'} <TitleHighlight>{services?.subtitle || 'Business'}</TitleHighlight>
          </ServicesTitle>
        </LeftHeader>
        
        <RightHeader>
          <ServicesDescription>
            {services?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'}
          </ServicesDescription>
          
          <CTAButton>
            {services?.ctaText || 'see more'}
            <ArrowRightIcon width={12} height={12} color="#ffffff" />
          </CTAButton>
        </RightHeader>
      </ServicesHeader>
      
      <ServicesGrid>
        {services?.servicesList?.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};

export default ServicesSection;