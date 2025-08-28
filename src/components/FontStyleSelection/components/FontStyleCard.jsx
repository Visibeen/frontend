import React from 'react';
import { ButtonBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(ButtonBase)(({ theme, selected }) => ({
  width: '160px',
  height: '120px',
  backgroundColor: '#ffffff',
  border: selected ? '2px solid #0B91D6' : '1px solid #E0E0E0',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#0B91D6',
    boxShadow: '0px 2px 8px rgba(11, 145, 214, 0.12)'
  },
  '&:focus': {
    outline: 'none',
    borderColor: '#0B91D6',
    boxShadow: '0px 2px 8px rgba(11, 145, 214, 0.12)'
  }
}));

const CardText = styled(Typography)(({ theme, fontFamily }) => ({
  fontFamily: fontFamily,
  fontSize: '18px',
  fontWeight: 400,
  color: '#000000',
  textAlign: 'center'
}));

const FontStyleCard = ({ fontStyle, selected, onClick }) => {
  return (
    <StyledCard 
      selected={selected}
      onClick={() => onClick(fontStyle.id)}
      disableRipple
    >
      <CardText fontFamily={fontStyle.fontFamily}>
        {fontStyle.name}
      </CardText>
    </StyledCard>
  );
};

export default FontStyleCard;