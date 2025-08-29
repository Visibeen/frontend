import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#03a9f4', // Blue from design
      light: '#42a5f5',
      dark: '#0277bd',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#00296c', // Dark blue from service titles
      light: '#1976d2',
      dark: '#001e4d',
      contrastText: '#ffffff'
    },
    error: {
      main: '#EF232A',
      light: '#F25A5F',
      dark: '#D61E24',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#ffeb3b', // Yellow accent from design
      light: '#fff176',
      dark: '#f57f17',
      contrastText: '#000000'
    },
    text: {
      primary: '#333333', // Main text color
      secondary: '#9ca6c1', // Secondary text color
      disabled: '#a2a9b0'
    },
    background: {
      default: '#ffffff',
      paper: '#f6f6f6' // Footer background
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6', 
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
    divider: 'rgba(160, 160, 170, 0.2)'
  },
  typography: {
    fontFamily: 'Montserrat, Source Sans Pro, sans-serif',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '60px',
      fontWeight: 500,
      letterSpacing: '1px',
      lineHeight: '80px'
    },
    h2: {
      fontFamily: 'Montserrat, sans-serif', 
      fontSize: '30px',
      fontWeight: 700,
      letterSpacing: '1px',
      lineHeight: '33px'
    },
    h3: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '30px', 
      fontWeight: 400,
      letterSpacing: '1px',
      lineHeight: '33px'
    },
    h4: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '22px',
      fontWeight: 500,
      letterSpacing: '-0.44px'
    },
    h5: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '18px',
      fontWeight: 700,
      letterSpacing: '1px',
      lineHeight: '19.80px'
    },
    h6: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#121927'
    },
    body1: {
      fontFamily: 'Source Sans Pro, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      letterSpacing: '-0.32px',
      lineHeight: '20px'
    },
    body2: {
      fontFamily: 'Source Sans Pro, sans-serif',
      fontSize: '15.5px',
      fontWeight: 400,
      lineHeight: '24px'
    },
    caption: {
      fontFamily: 'Source Sans Pro, sans-serif',
      fontSize: '14px',
      fontWeight: 400
    }
  },
  shape: {
    borderRadius: 4
  }
});

export default theme;