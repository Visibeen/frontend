import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TruckIcon from '../icons/TruckIcon';
import AirplaneIcon from '../icons/AirplaneIcon';
import DeliveryIcon from '../icons/DeliveryIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '15px',
  border: '1px solid rgba(156, 196, 207, 0.25)',
  overflow: 'hidden',
  width: '399px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff'
}));

const CardImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '280px',
  objectFit: 'cover',
  borderRadius: '15px 15px 0px 0px'
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '30px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '9px'
}));

const IconContainer = styled(Box)(({ theme }) => ({
  marginBottom: '20px'
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '22px',
  fontWeight: 600,
  lineHeight: '28.60px',
  color: '#140a09',
  marginBottom: '12px'
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '25.50px',
  color: '#565969',
  flex: 1,
  marginBottom: '20px'
}));

const ReadMoreButton = styled(Button)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 700,
  textTransform: 'capitalize',
  color: '#140a09',
  backgroundColor: 'transparent',
  padding: '8px 16px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(11, 145, 214, 0.1)'
  }
}));

const ServiceCard = ({ service }) => {
  const getServiceIcon = (iconType) => {
    switch (iconType) {
      case 'truck':
        return <TruckIcon width={35} height={28} color="#0b91d6" />;
      case 'airplane':
        return <AirplaneIcon width={33} height={35} color="#0b91d6" />;
      case 'delivery':
        return <DeliveryIcon width={35} height={31} color="#0b91d6" />;
      default:
        return <TruckIcon width={35} height={28} color="#0b91d6" />;
    }
  };

  return (
    <StyledCard>
      <CardImage
        src={service.image}
        alt={service.title}
      />
      <StyledCardContent>
        <IconContainer>
          {getServiceIcon(service.icon)}
        </IconContainer>
        
        <ServiceTitle>
          {service.title}
        </ServiceTitle>
        
        <ServiceDescription>
          {service.description}
        </ServiceDescription>
        
        <ReadMoreButton>
          Read More
          <ArrowRightIcon width={12} height={12} color="#140a09" />
        </ReadMoreButton>
      </StyledCardContent>
    </StyledCard>
  );
};

export default ServiceCard;