import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Typography } from '@mui/material';
import template5Theme from './components/Template5/Template5Theme';
import Template5 from './components/Template5/Template5';
import { mockRootProps } from './components/Template5/Template5MockData';

function App() {
  return (
    <ThemeProvider theme={template5Theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: '#fcf9f0' }}>
        <Box sx={{ 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: '#fff',
          marginBottom: '20px'
        }}>
          <Typography variant="h4" sx={{ color: '#222838', marginBottom: '10px' }}>
            Template 5 - Updated with GreenPeak Marketing Footer
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            Scroll down to see the new footer at the bottom
          </Typography>
        </Box>
        <Template5 
          templateData={mockRootProps}
          isEditable={true}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;