import React from 'react';
import { Card, CardMedia, CardContent, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '15px',
  border: '1px solid rgba(156, 196, 207, 0.25)',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.50)',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}));

const ServiceImage = styled(CardMedia)(({ theme }) => ({
  height: '307px',
  objectFit: 'cover'
}));

const ServiceContent = styled(CardContent)(({ theme }) => ({
  padding: '27px 25px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '28px',
  fontWeight: 500,
  letterSpacing: '-0.70px',
  color: '#171717',
  marginBottom: '27px'
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '25.50px',
  color: '#565969',
  flex: 1
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
        <Stack spacing={3}>
          <ServiceTitle>
            {service.title}
          </ServiceTitle>
          <ServiceDescription>
            {service.description}
          </ServiceDescription>
        </Stack>
      </ServiceContent>
    </StyledCard>
  );
};

export default ServiceCard;