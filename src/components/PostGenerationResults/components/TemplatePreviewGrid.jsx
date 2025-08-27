import React from 'react';
import { Stack, Box, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';

const GridContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px',
  justifyContent: 'center',
  marginBottom: '24px'
}));

const TemplateCard = styled(ButtonBase)(({ theme, selected }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '12px',
  border: selected ? '3px solid #0B91D6' : '2px solid #E0E0E0',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#0B91D6',
    transform: 'scale(1.02)'
  }
}));

const TemplateImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));

const TemplatePreviewGrid = ({ templates, selectedTemplateId, onTemplateSelect }) => {
  return (
    <GridContainer>
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          selected={selectedTemplateId === template.id}
          onClick={() => onTemplateSelect(template.id)}
        >
          <TemplateImage 
            src={template.thumbnail} 
            alt={`Template ${template.id}`}
          />
        </TemplateCard>
      ))}
    </GridContainer>
  );
};

export default TemplatePreviewGrid;