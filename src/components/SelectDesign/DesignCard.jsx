import React from 'react';
import { Card, CardMedia, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  borderRadius: '8px',
  border: '0.4px solid rgba(160, 160, 170, 0.70)',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)'
  }
}));

const CardLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '11.53px',
  fontWeight: 500,
  color: '#121927',
  padding: '8px 12px',
  textAlign: 'center'
}));

const DesignCard = ({ image, label, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      <CardMedia
        component="img"
        image={image}
        alt={label}
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover'
        }}
      />
      <Box>
        <CardLabel>{label}</CardLabel>
      </Box>
    </StyledCard>
  );
};

export default DesignCard;