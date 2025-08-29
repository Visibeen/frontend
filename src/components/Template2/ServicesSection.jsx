import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ServiceCard from './ServiceCard';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '80px 315px',
  backgroundColor: '#ffffff'
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '60px',
  gap: '19.6px'
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

const SectionDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  letterSpacing: '0.10px',
  lineHeight: '27.54px',
  color: '#797c7f',
  maxWidth: '584px'
}));

const ServicesGrid = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '30px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  [theme.breakpoints.down('lg')]: {
    gap: '20px'
  }
}));

const ServicesSection = ({ services = [] }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Contact Us</SectionTitle>
        <SectionHeading>Our Main Services</SectionHeading>
        <SectionDescription>
          Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
        </SectionDescription>
      </SectionHeader>
      
      <ServicesGrid>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </ServicesGrid>
    </SectionContainer>
  );
};

export default ServicesSection;