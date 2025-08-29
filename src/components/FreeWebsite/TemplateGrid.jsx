import React from 'react';
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import TemplateCard from './TemplateCard';

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px'
}));

const GridRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '25px',
  justifyContent: 'flex-start'
}));

const TemplateGrid = ({ templates, selectedTemplate, onTemplateSelect, onPreview, onUseTemplate }) => {
  // Split templates into rows of 3
  const templateRows = [];
  for (let i = 0; i < templates.length; i += 3) {
    templateRows.push(templates.slice(i, i + 3));
  }

  return (
    <GridContainer>
      {templateRows.map((row, rowIndex) => (
        <GridRow key={rowIndex}>
          {row.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              selected={selectedTemplate?.id === template.id}
              onClick={() => onTemplateSelect(template)}
              onPreview={onPreview}
              onUseTemplate={onUseTemplate}
            />
          ))}
        </GridRow>
      ))}
    </GridContainer>
  );
};

export default TemplateGrid;