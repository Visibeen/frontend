import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExportPDFIcon from '../icons/ExportPDFIcon';
import EditPencilIcon from '../icons/EditPencilIcon';

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '24px'
}));

const HeaderLeft = styled(Stack)(({ theme }) => ({
  gap: '6px'
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E'
}));

const ExportButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px',
  border: '0.6px solid #A0A0AA',
  backgroundColor: 'rgba(160, 160, 170, 0.10)',
  color: '#121927',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'none',
  padding: '12px 16px',
  gap: '10px',
  '&:hover': {
    backgroundColor: 'rgba(160, 160, 170, 0.15)'
  }
}));

const KeywordSection = styled(Stack)(({ theme }) => ({
  direction: 'row',
  alignItems: 'center',
  gap: '24px',
  marginTop: '16px'
}));

const KeywordItem = styled(Stack)(({ theme }) => ({
  direction: 'row',
  alignItems: 'center',
  gap: '10px'
}));

const KeywordText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const DateContainer = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  border: '0.6px solid #F6F0F0',
  boxShadow: '0px 55px 22px rgba(0, 0, 0, 0.01), 0px 86px 24px rgba(0, 0, 0, 0.00)',
  padding: '12px 16px',
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const HeatmapResultsHeader = ({ keyword, date }) => {
  const handleExportPDF = () => {
    console.log('Export to PDF clicked');
    // Implement PDF export functionality
  };

  return (
    <Box>
      <HeaderContainer>
        <HeaderLeft>
          <MainTitle>Heat Map</MainTitle>
          <SubTitle>
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
          </SubTitle>
        </HeaderLeft>
        
        <ExportButton onClick={handleExportPDF}>
          <ExportPDFIcon width={17} height={17} />
          Export to PDF
        </ExportButton>
      </HeaderContainer>

      <KeywordSection>
        <KeywordItem>
          <KeywordText>{keyword}</KeywordText>
          <EditPencilIcon width={17} height={17} />
        </KeywordItem>
        
        <DateContainer>
          <DateText>{date}</DateText>
          <EditPencilIcon width={17} height={17} />
        </DateContainer>
      </KeywordSection>
    </Box>
  );
};

export default HeatmapResultsHeader;