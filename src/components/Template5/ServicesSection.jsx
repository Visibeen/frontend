import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ServiceCard from './ServiceCard';

const ServicesContainer = styled(Stack)(({ theme }) => ({
  padding: '60px 30px',
  spacing: 5,
  backgroundColor: '#fcf9f0'
}));

const SectionLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '22px',
  fontWeight: 400,
  lineHeight: '26px',
  textTransform: 'capitalize',
  color: '#222838',
  textAlign: 'center',
  marginBottom: '10px'
}));

const ServicesTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '45px',
  fontWeight: 500,
  lineHeight: '48px',
  textTransform: 'capitalize',
  color: '#222838',
  textAlign: 'center',
  marginBottom: '40px',
  [theme.breakpoints.down('md')]: {
    fontSize: '35px',
    lineHeight: '38px'
  }
}));

const ServicesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '40px',
  marginBottom: '40px',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr'
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
    <ServicesContainer spacing={5}>
      <Box>
        <SectionLabel>
          Services
        </SectionLabel>
        <ServicesTitle>
          Our Main Services
        </ServicesTitle>
      </Box>
      
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