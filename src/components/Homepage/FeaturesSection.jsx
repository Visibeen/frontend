import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AutoListingsIcon from '../icons/AutoListingsIcon';
import ScheduledReviewsIcon from '../icons/ScheduledReviewsIcon';
import OneClickIcon from '../icons/OneClickIcon';

const FeaturesContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F8F8',
  padding: '80px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '40px'
}));

const FeaturesHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '16px',
  textAlign: 'center'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '46px',
  fontWeight: 700,
  color: '#121927'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#121927',
  maxWidth: '623px'
}));

const FeaturesGrid = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '40px',
  justifyContent: 'center',
  flexWrap: 'wrap'
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  width: '276px',
  height: '254px',
  backgroundColor: '#ffffff',
  borderRadius: '4px',
  boxShadow: '0px 10px 60px rgba(46, 61, 98, 0.10)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '24px',
  padding: '40px 20px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0px 20px 80px rgba(46, 61, 98, 0.15)'
  }
}));

const FeatureIconContainer = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '34px',
  color: '#121927',
  textAlign: 'center'
}));

const FeatureBackground = styled(Box)(({ theme, color }) => ({
  position: 'absolute',
  bottom: '-38px',
  left: '100px',
  width: '76px',
  height: '76px',
  borderRadius: '50%',
  backgroundColor: color || 'rgba(255, 255, 255, 0.10)',
  opacity: 0.1
}));

const FeaturesSection = () => {
  const features = [
    {
      icon: <AutoListingsIcon width={60} height={60} />,
      title: 'Auto-listings to 15+ directories',
      bgColor: 'rgba(11, 145, 214, 0.10)'
    },
    {
      icon: <ScheduledReviewsIcon width={60} height={53} />,
      title: 'Scheduled review requests',
      bgColor: 'rgba(52, 168, 83, 0.10)'
    },
    {
      icon: <OneClickIcon width={57} height={60} />,
      title: 'One-click profile updates',
      bgColor: 'rgba(239, 35, 42, 0.10)'
    }
  ];

  return (
    <FeaturesContainer>
      <FeaturesHeader>
        <SectionTitle>Automated & Easy to Use</SectionTitle>
        <SectionSubtitle>
          Save hours every week with automated local SEO tool.
        </SectionSubtitle>
      </FeaturesHeader>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIconContainer>
              {feature.icon}
            </FeatureIconContainer>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureBackground color={feature.bgColor} />
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesContainer>
  );
};

export default FeaturesSection;