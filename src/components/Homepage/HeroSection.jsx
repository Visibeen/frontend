import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F8F8',
  padding: '80px 0 120px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '61px'
}));

const HeroContent = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '12px',
  maxWidth: '825px',
  textAlign: 'center'
}));

const MainHeadline = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '46px',
  fontWeight: 700,
  lineHeight: '43px',
  color: '#0B91D6',
  marginBottom: '12px'
}));

const SubHeadline = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '26px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '12px'
}));

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  color: '#121927',
  maxWidth: '621px'
}));

const HeroIllustration = styled('img')(({ theme }) => ({
  width: '540px',
  height: '290px',
  borderRadius: '24px'
}));

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <MainHeadline>Boost Your Local Presence.</MainHeadline>
        <SubHeadline>Smart Optimization = Maximum Visibility = More Local Customers</SubHeadline>
        <Description>
          Effortlessly manage your local SEO with automation tools built to increase rankings, drive foot traffic, and grow your business
        </Description>
      </HeroContent>
      
      <HeroIllustration 
        src="/images/seo-hero.jpg" 
        alt="SEO Optimization Illustration" 
      />
    </HeroContainer>
  );
};

export default HeroSection;