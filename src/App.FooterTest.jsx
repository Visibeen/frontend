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
        backgroundColor: '#fcf9f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
        <Box sx={{ 
          width: '100%',
          border: '2px solid red',
          margin: '20px 0'
        }}>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;