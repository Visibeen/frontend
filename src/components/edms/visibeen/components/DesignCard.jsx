import React from 'react';
import { Card, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import TemplateFooterVariants from './TemplateFooterVariants';

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  borderRadius: '8px',
  border: '0.4px solid rgba(160, 160, 170, 0.70)',
  transition: 'all 0.2s ease',
  overflow: 'hidden',
  padding: 0,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  }
}));

const DesignImage = styled(CardMedia)(({ theme }) => ({
  height: '219px',
  objectFit: 'cover'
}));


const DesignCard = ({ design, onClick, accountInfo }) => {
  return (
    <StyledCard onClick={onClick}>
      <DesignImage
        component="img"
        image={design.imageUrl}
        alt={`Template ${design.id}`}
      />
      <TemplateFooterVariants designId={design.id} accountInfo={accountInfo} />
    </StyledCard>
  );
};

export default DesignCard;