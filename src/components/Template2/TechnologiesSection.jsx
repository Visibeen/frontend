import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import TechnologyCard from './TechnologyCard';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '80px 315px',
  backgroundColor: '#ffffff'
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '60px',
  gap: '19.59px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '1.80px',
  textTransform: 'uppercase',
  color: '#f4762a'
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '57px',
  fontWeight: 700,
  letterSpacing: '-1.10px',
  lineHeight: '60px',
  color: '#0d2b23',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    lineHeight: '45px'
  }
}));

const TechnologiesGrid = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '30px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  [theme.breakpoints.down('lg')]: {
    gap: '20px'
  }
}));

const TechnologiesSection = ({ technologies = [] }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Contact Us</SectionTitle>
        <SectionHeading>Our Leading Technologies</SectionHeading>
      </SectionHeader>
      
      <TechnologiesGrid>
        {technologies.map((technology) => (
          <TechnologyCard key={technology.id} technology={technology} />
        ))}
      </TechnologiesGrid>
    </SectionContainer>
  );
};

export default TechnologiesSection;