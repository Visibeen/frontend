import React from 'react';
import { Card, CardContent, CardMedia, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '4px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.10)',
  overflow: 'hidden',
  height: '456px',
  width: '345px'
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: '316px',
  border: 'none'
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '20px',
  height: '120px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '22px',
  fontWeight: 500,
  letterSpacing: '-0.44px',
  color: '#00296c'
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Source Sans Pro, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  letterSpacing: '-0.32px',
  lineHeight: '20px',
  color: '#9ca6c1'
}));

const ServiceCard = ({ service }) => {
  return (
    <StyledCard>
      <StyledCardMedia
        component="img"
        image={service.image}
        alt={service.name}
      />
      <StyledCardContent>
        <ServiceTitle>
          {service.name}
        </ServiceTitle>
        <ServiceDescription>
          {service.description}
        </ServiceDescription>
      </StyledCardContent>
    </StyledCard>
  );
};

export default ServiceCard;