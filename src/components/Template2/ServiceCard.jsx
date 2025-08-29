import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '../icons/ArrowRightIcon';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '8px',
  boxShadow: '0px 3px 60px rgba(0, 0, 0, 0.04)',
  overflow: 'hidden',
  height: '597px',
  width: '410px',
  display: 'flex',
  flexDirection: 'column'
}));

const CardImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '306px',
  objectFit: 'cover'
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '30px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '12.6px'
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '26.50px',
  fontWeight: 700,
  letterSpacing: '-0.28px',
  lineHeight: '32.11px',
  color: '#0d2b23'
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  letterSpacing: '0.10px',
  lineHeight: '28px',
  color: '#797c7f',
  flex: 1
}));

const ArrowContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: 'auto'
}));

const ServiceCard = ({ service }) => {
  return (
    <StyledCard>
      <CardImage
        src={service.image}
        alt={service.title}
      />
      <StyledCardContent>
        <ServiceTitle>
          {service.title}
        </ServiceTitle>
        <ServiceDescription>
          {service.description}
        </ServiceDescription>
        {service.hasArrow && (
          <ArrowContainer>
            <ArrowRightIcon width={13} height={9} color="#0d2b23" />
          </ArrowContainer>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};

export default ServiceCard;