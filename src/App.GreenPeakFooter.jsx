import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Footer from './components/Template5/Footer';

const theme = createTheme({
  palette: {
    mode: 'light'
  },
  typography: {
    fontFamily: 'Poppins, sans-serif'
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        width: '100%', 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box sx={{ width: '300px' }}>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;