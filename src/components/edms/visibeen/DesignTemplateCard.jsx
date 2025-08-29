import React from 'react';
import { Card, CardMedia, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  width: 280,
  height: 219,
  borderRadius: 8,
  border: '0.41px solid rgba(160, 160, 170, 0.70)',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4]
  }
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: 11.53,
  fontWeight: 500,
  color: theme.palette.text.primary,
  fontFamily: 'Inter, sans-serif',
  padding: '8px 12px'
}));

const DesignTemplateCard = ({ template, onClick }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <StyledCard onClick={() => onClick(template)}>
        <CardMedia
          component="img"
          image={template.image}
          alt={template.title}
          sx={{
            width: '100%',
            height: 219,
            objectFit: 'cover'
          }}
        />
      </StyledCard>
      <CardTitle>{template.title}</CardTitle>
    </Box>
  );
};

export default DesignTemplateCard;