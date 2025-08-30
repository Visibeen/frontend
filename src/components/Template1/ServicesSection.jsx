import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ServiceCard from './ServiceCard';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '80px 20px',
  backgroundColor: '#ffffff'
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '53px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '30px',
  fontWeight: 400,
  letterSpacing: '1px',
  lineHeight: '33px',
  textTransform: 'uppercase',
  color: '#333333',
  marginBottom: '16px'
}));

const ServicesGrid = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '53px'
}));

const ServicesRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '40px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  [theme.breakpoints.down('lg')]: {
    gap: '20px'
  }
}));

const ServicesSection = ({ services = [] }) => {
  // Split services into two rows of 4 each
  const firstRowServices = services.slice(0, 4);
  const secondRowServices = services.slice(4, 8);

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>our services</SectionTitle>
      </SectionHeader>
      
      <ServicesGrid>
        <ServicesRow>
          {firstRowServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ServicesRow>
        
        <ServicesRow>
          {secondRowServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ServicesRow>
      </ServicesGrid>
    </SectionContainer>
  );
};

export default ServicesSection;