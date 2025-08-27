import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import FontStyleGrid from './components/FontStyleGrid';
import GenerateButton from './components/GenerateButton';
import { mockRootProps } from './FontStyleSelectionMockData';

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto'
}));

const PageHeader = styled(Stack)(({ theme }) => ({
  gap: '16px',
  marginBottom: '40px'
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const PageDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E',
  lineHeight: '20px'
}));

const SelectionSection = styled(Stack)(({ theme }) => ({
  gap: '40px',
  alignItems: 'center'
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  gap: '6px',
  alignItems: 'center',
  textAlign: 'center'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '26px',
  fontWeight: 600,
  textTransform: 'capitalize',
  color: '#121927'
}));

const SectionDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E'
}));

const FontStyleSelection = ({ fontStyles: initialFontStyles }) => {
  const fontStyles = initialFontStyles || mockRootProps.fontStyles;
  const [selectedStyleId, setSelectedStyleId] = useState(
    fontStyles.find(style => style.selected)?.id || fontStyles[0]?.id
  );

  const handleStyleSelect = (styleId) => {
    setSelectedStyleId(styleId);
  };

  const handleGenerate = () => {
    const selectedStyle = fontStyles.find(style => style.id === selectedStyleId);
    console.log('Generate clicked with style:', selectedStyle);
    // Handle generate logic here
  };

  return (
    <DashboardLayout>
      <ContentContainer>
        <PageHeader>
          <PageTitle>Create Post</PageTitle>
          <PageDescription>
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
          </PageDescription>
        </PageHeader>

        <SelectionSection>
          <SectionHeader>
            <SectionTitle>Select Font Styles That You Like</SectionTitle>
            <SectionDescription>
              Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing
            </SectionDescription>
          </SectionHeader>

          <FontStyleGrid
            fontStyles={fontStyles}
            selectedStyleId={selectedStyleId}
            onStyleSelect={handleStyleSelect}
          />

          <GenerateButton
            onClick={handleGenerate}
            disabled={!selectedStyleId}
          />
        </SelectionSection>
      </ContentContainer>
    </DashboardLayout>
  );
};

export default FontStyleSelection;