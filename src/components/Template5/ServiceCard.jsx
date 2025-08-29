import React from 'react';
import { Card, CardMedia, CardContent, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '9.89900016784668px 9.89900016784668px 30px rgba(0, 0, 0, 0.10)',
  borderRadius: '8px',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff'
}));

const ServiceImage = styled(CardMedia)(({ theme }) => ({
  height: '272px',
  objectFit: 'cover'
}));

const ServiceContent = styled(CardContent)(({ theme }) => ({
  padding: '20px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '24px',
  textTransform: 'capitalize',
  color: '#222838',
  marginBottom: '8px'
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '22px',
  color: '#222838',
  flex: 1,
  marginBottom: '15px'
}));

const LinkButton = styled(Box)(({ theme }) => ({
  width: '142px',
  height: '52px',
  border: '1px solid #ffffff',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)'
  }
}));

const ServiceCard = ({ service }) => {
  return (
    <StyledCard>
      <ServiceImage
        component="img"
        image={service.image}
        alt={service.title}
      />
      <ServiceContent>
        <Stack spacing={1}>
          <ServiceTitle>
            {service.title}
          </ServiceTitle>
          <ServiceDescription>
            {service.description}
          </ServiceDescription>
          <LinkButton />
        </Stack>
      </ServiceContent>
    </StyledCard>
  );
};

export default ServiceCard;