import React, { useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import DesignTemplateCard from './DesignTemplateCard';
import { mockDesignTemplates } from './selectDesignMockData';

const SectionContainer = styled(Stack)(({ theme }) => ({
  gap: 40,
  padding: '0 40px',
  alignItems: 'center'
}));

const HeaderContainer = styled(Stack)(({ theme }) => ({
  gap: 6,
  alignItems: 'center',
  textAlign: 'center'
}));

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 25,
  width: '100%',
  maxWidth: 893
}));

const DesignTemplateGrid = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    // Navigate to font style selection after a brief delay
    setTimeout(() => {
      navigate('../font-style');
    }, 200);
  };

  return (
    <SectionContainer>
      <HeaderContainer>
        <Typography 
          variant="h2" 
          sx={{ 
            fontSize: 26,
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Select Design
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: 14,
            fontWeight: 400,
            color: 'text.secondary'
          }}
        >
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing
        </Typography>
      </HeaderContainer>
      
      <GridContainer>
        {mockDesignTemplates.map((template) => (
          <DesignTemplateCard
            key={template.id}
            template={template}
            onClick={handleTemplateClick}
          />
        ))}
      </GridContainer>
    </SectionContainer>
  );
};

export default DesignTemplateGrid;