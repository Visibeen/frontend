import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardContainer = styled(Box)(({ theme, isSelected }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '160px',
  height: '120px',
  border: isSelected ? '2px solid #0B91D6' : '1px solid #E5E7EB',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#0B91D6',
    boxShadow: '0 2px 8px rgba(11, 145, 214, 0.1)'
  }
}));

const StyleText = styled(Typography)(({ theme, fontFamily }) => ({
  fontFamily: fontFamily,
  fontSize: '18px',
  fontWeight: 400,
  color: '#000000',
  textAlign: 'center'
}));

const FontStyleCard = ({ style, isSelected, onSelect }) => {
  return (
    <CardContainer isSelected={isSelected} onClick={onSelect}>
      <StyleText fontFamily={style.fontFamily}>
        {style.name}
      </StyleText>
    </CardContainer>
  );
};

export default FontStyleCard;