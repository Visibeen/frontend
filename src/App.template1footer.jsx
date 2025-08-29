import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Template1Footer from './components/edms/visibeen/components/Template1Footer';
import TemplateFooterVariants from './components/edms/visibeen/components/TemplateFooterVariants';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B365D',
    },
    secondary: {
      main: '#2a5298',
    },
    background: {
      default: '#F8F8F8',
      paper: '#ffffff'
    },
    text: {
      primary: '#121927',
      secondary: '#30302E'
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

const PreviewContainer = styled(Container)(({ theme }) => ({
  padding: '40px 20px',
  backgroundColor: '#F8F8F8',
  minHeight: '100vh'
}));

const TemplateCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
  marginBottom: '32px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  margin: '0 auto 32px auto'
}));

const TemplateContent = styled(Box)(({ theme }) => ({
  padding: '40px 20px',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '32px',
  textAlign: 'center'
}));

// Mock account info matching the figma design
const mockAccountInfo = {
  businessName: "URBANTECH SOLUTIONS",
  contact: "6858653555",
  website: "WWW.WEBSITE.COM", 
  address: "2385 SYCAMORE STREET, COLUMBUS, OH 43215"
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PreviewContainer>
        <SectionTitle>Template 1 Footer - Real Estate Plot on Sale</SectionTitle>
        
        <TemplateCard>
          <TemplateContent>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#121927', mb: 1 }}>
              PLOT ON SALE
            </Typography>
            <Typography variant="h6" sx={{ color: '#666', mb: 3 }}>
              GREAT OPPORTUNITY!
            </Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: 2, 
              width: '100%',
              maxWidth: '300px',
              fontSize: '12px',
              color: '#333'
            }}>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>SIZE:</Typography>
                <Typography variant="body2">300SQ FT</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>PRICE:</Typography>
                <Typography variant="body2">1.50CR</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>GATED</Typography>
                <Typography variant="body2">COMMUNITY</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>NEAR</Typography>
                <Typography variant="body2">AIRPORT</Typography>
              </Box>
            </Box>
          </TemplateContent>
          
          <Template1Footer accountInfo={mockAccountInfo} />
        </TemplateCard>

        <SectionTitle>All Template Footer Variants</SectionTitle>
        
        {[1, 2, 3, 4, 5, 6].map((templateId) => (
          <TemplateCard key={templateId}>
            <TemplateContent>
              <Typography variant="h6" sx={{ color: '#121927', mb: 2 }}>
                Template {templateId} Preview
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Sample content for template {templateId}
              </Typography>
            </TemplateContent>
            
            <TemplateFooterVariants designId={templateId} accountInfo={mockAccountInfo} />
          </TemplateCard>
        ))}
      </PreviewContainer>
    </ThemeProvider>
  );
};

export default App;