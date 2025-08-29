import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Template2 from './components/Template2/Template2';
import { mockRootProps } from './components/Template2/Template2MockData';

// Template 2 theme
const template2Theme = createTheme({
  palette: {
    primary: {
      main: '#0baa68', // Green from design
      light: '#34a853',
      dark: '#00663c',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#f4762a', // Orange accent from design
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#ffffff'
    },
    text: {
      primary: '#0d2b23', // Dark green text
      secondary: '#797c7f', // Gray text
      disabled: '#a5a6aa'
    },
    background: {
      default: '#ffffff',
      paper: '#f9f7f7' // Light background
    },
    success: {
      main: '#34a853', // Green success
      light: '#4caf50',
      dark: '#2e7d32',
      contrastText: '#ffffff'
    },
    info: {
      main: '#565969', // Muted blue-gray
      light: '#9e9e9e',
      dark: '#424242',
      contrastText: '#ffffff'
    },
    grey: {
      50: '#f9f7f7',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  },
  typography: {
    fontFamily: 'Nunito, Kumbh Sans, DM Sans, Inter, sans-serif',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontFamily: 'Kumbh Sans, sans-serif',
      fontSize: '57px',
      fontWeight: 700,
      letterSpacing: '-1.10px',
      lineHeight: '60px'
    },
    h2: {
      fontFamily: 'Kumbh Sans, sans-serif',
      fontSize: '47px',
      fontWeight: 700,
      letterSpacing: '-0.90px',
      lineHeight: '47px'
    },
    h3: {
      fontFamily: 'Kumbh Sans, sans-serif',
      fontSize: '28px',
      fontWeight: 700,
      letterSpacing: '-0.24px',
      lineHeight: '33.60px'
    },
    h4: {
      fontFamily: 'Kumbh Sans, sans-serif',
      fontSize: '26.50px',
      fontWeight: 700,
      letterSpacing: '-0.28px',
      lineHeight: '32.11px'
    },
    h5: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: '28.60px'
    },
    h6: {
      fontFamily: 'Kumbh Sans, sans-serif',
      fontSize: '20px',
      fontWeight: 700,
      letterSpacing: '-0.30px',
      lineHeight: '24px'
    },
    body1: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '17px',
      fontWeight: 400,
      letterSpacing: '0.10px',
      lineHeight: '27.54px'
    },
    body2: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '17px',
      fontWeight: 400,
      lineHeight: '25.50px'
    },
    caption: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '14px',
      fontWeight: 400
    },
    overline: {
      fontFamily: 'Kumbh Sans, sans-serif',
      fontSize: '14px',
      fontWeight: 700,
      letterSpacing: '1.80px',
      textTransform: 'uppercase'
    },
    button: {
      fontFamily: 'Kumbh Sans, sans-serif',
      fontSize: '13px',
      fontWeight: 700,
      letterSpacing: '1.30px',
      textTransform: 'uppercase'
    }
  },
  shape: {
    borderRadius: 12
  }
});

function App() {
  return (
    <ThemeProvider theme={template2Theme}>
      <CssBaseline />
      <Template2 
        templateData={mockRootProps}
        isEditable={true}
      />
    </ThemeProvider>
  );
}

export default App;