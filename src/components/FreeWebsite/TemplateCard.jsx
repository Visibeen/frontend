import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const TemplateCardContainer = styled(Box)(({ theme, selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

const TemplateImage = styled('img')(({ theme, selected }) => ({
  width: '280px',
  height: '219px',
  objectFit: 'cover',
  borderRadius: selected ? '10px' : '8px',
  border: selected ? '1px solid #0B91D6' : '0.6px solid #D9D9D9',
  transition: 'all 0.2s ease'
}));

const TemplateTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '11.53px',
  fontWeight: 500,
  color: '#121927',
  marginTop: '4px'
}));

const ActionButtons = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px',
  marginTop: '16px',
  justifyContent: 'center'
}));

const UseTemplateButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#27ae60',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  padding: '8px 16px',
  borderRadius: '4px',
  minWidth: '120px',
  '&:hover': {
    backgroundColor: '#229954'
  }
}));

const PreviewButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0B91D6',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  padding: '8px 24px',
  borderRadius: '4px',
  minWidth: '80px',
  '&:hover': {
    backgroundColor: '#0980C2'
  }
}));

const TemplateCard = ({ template, selected, onClick, onPreview, onUseTemplate }) => {
  return (
    <TemplateCardContainer selected={selected} onClick={onClick}>
      <TemplateImage 
        src={template.image} 
        alt={template.name}
        selected={selected}
      />
      <TemplateTitle>{template.name}</TemplateTitle>
      
      {selected && (
        <ActionButtons>
          <UseTemplateButton onClick={(e) => {
            e.stopPropagation();
            onUseTemplate(template);
          }}>
            Use this Template
          </UseTemplateButton>
          <PreviewButton onClick={(e) => {
            e.stopPropagation();
            onPreview(template);
          }}>
            Preview
          </PreviewButton>
        </ActionButtons>
      )}
    </TemplateCardContainer>
  );
};

export default TemplateCard;