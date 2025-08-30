import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ServiceCard from './ServiceCard';

const ServicesContainer = styled(Stack)(({ theme }) => ({
  padding: '40px 30px',
  spacing: 3
}));

const ServicesTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '64px',
  fontWeight: 500,
  letterSpacing: '-2.24px',
  lineHeight: '70.40px',
  color: '#171717',
  textAlign: 'center',
  marginBottom: '40px',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    lineHeight: '44px'
  }
}));

const ServicesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '20px',
  marginBottom: '40px',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  }
}));

const ViewMoreButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  textTransform: 'capitalize',
  color: '#222838',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: 'rgba(34, 40, 56, 0.04)'
  }
}));

const ServicesSection = ({ services }) => {
  return (
    <ServicesContainer spacing={3}>
      <ServicesTitle>
        Our Services
      </ServicesTitle>
      
      <ServicesGrid>
        {services?.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </ServicesGrid>
      
      <ViewMoreButton>
        view more
      </ViewMoreButton>
    </ServicesContainer>
  );
};

export default ServicesSection;