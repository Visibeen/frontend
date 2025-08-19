import React, { useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import FontStyleCard from './FontStyleCard';

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '40px'
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
  textAlign: 'center'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '26px',
  fontWeight: 600,
  color: '#121927',
  textTransform: 'capitalize'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E'
}));

const FontGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '29px'
}));

const FontRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '60px',
  justifyContent: 'center'
}));

const GenerateButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  color: '#ffffff',
  backgroundColor: '#0B91D6',
  padding: '12px 24px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#0980C2'
  }
}));

const fontStyles = [
  { id: 'modern', name: 'Modern', fontFamily: 'Poppins, sans-serif' },
  { id: 'elegant', name: 'Elegant', fontFamily: 'Open Sans, sans-serif' },
  { id: 'slab', name: 'Slab', fontFamily: 'Nunito Sans, sans-serif' },
  { id: 'handwritten', name: 'Hand Written', fontFamily: 'Montserrat, sans-serif' },
  { id: 'playful', name: 'Playful', fontFamily: 'Inter, sans-serif' },
  { id: 'futuristic', name: 'Futuristic', fontFamily: 'Roboto, sans-serif' }
];

const FontStyleGrid = () => {
  const [selectedStyle, setSelectedStyle] = useState('modern');

  const handleStyleSelect = (styleId) => {
    setSelectedStyle(styleId);
  };

  const handleGenerate = () => {
    console.log('Generate clicked with style:', selectedStyle);
    // Handle generate action
  };

  return (
    <GridContainer>
      <HeaderSection>
        <SectionTitle>Select font styles that you like</SectionTitle>
        <SectionSubtitle>
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing
        </SectionSubtitle>
      </HeaderSection>

      <FontGrid>
        <FontRow>
          {fontStyles.slice(0, 3).map((style) => (
            <FontStyleCard
              key={style.id}
              style={style}
              isSelected={selectedStyle === style.id}
              onSelect={() => handleStyleSelect(style.id)}
            />
          ))}
        </FontRow>
        
        <FontRow>
          {fontStyles.slice(3, 6).map((style) => (
            <FontStyleCard
              key={style.id}
              style={style}
              isSelected={selectedStyle === style.id}
              onSelect={() => handleStyleSelect(style.id)}
            />
          ))}
        </FontRow>
      </FontGrid>

      <GenerateButton onClick={handleGenerate}>
        Generate
      </GenerateButton>
    </GridContainer>
  );
};

export default FontStyleGrid;