import React from 'react';
import { Stack, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const FeatureContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 2,
  alignItems: 'flex-start',
  marginBottom: '20px'
}));

const FeatureIcon = styled(Avatar)(({ theme }) => ({
  width: '54px',
  height: '52px',
  borderRadius: '8px',
  backgroundColor: 'transparent'
}));

const FeatureContent = styled(Stack)(({ theme }) => ({
  flex: 1,
  spacing: 1
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '24px',
  textTransform: 'capitalize',
  color: '#ffffff'
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '22px',
  color: '#ffffff'
}));

const FeatureCard = ({ feature }) => {
  return (
    <FeatureContainer direction="row" spacing={2}>
      <FeatureIcon>
        <img 
          src={feature.icon} 
          alt={feature.title}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </FeatureIcon>
      <FeatureContent spacing={1}>
        <FeatureTitle>
          {feature.title}
        </FeatureTitle>
        <FeatureDescription>
          {feature.description}
        </FeatureDescription>
      </FeatureContent>
    </FeatureContainer>
  );
};

export default FeatureCard;