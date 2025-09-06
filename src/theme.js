import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b91d6',
      light: '#42a5f5',
      dark: '#0277bd',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ef232a',
      light: '#f25a5f',
      dark: '#d61e24',
      contrastText: '#ffffff'
    },
    error: {
      main: '#ef232a',
      light: '#f25a5f',
      dark: '#d61e24',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#ffeb3b',
      light: '#fff176',
      dark: '#f57f17',
      contrastText: '#000000'
    },
    text: {
      primary: '#121927',
      secondary: '#a0a0aa',
      disabled: '#a2a9b0'
    },
    background: {
      default: '#ffffff',
      paper: '#fafafa'
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
      900: '#121927'
    },
    divider: 'rgba(160, 160, 170, 0.2)'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '60px',
      fontWeight: 700,
      letterSpacing: '-1.8px',
      lineHeight: '71px',
      textTransform: 'capitalize'
    },
    h2: {
      fontFamily: 'Inter, sans-serif', 
      fontSize: '46px',
      fontWeight: 700,
      lineHeight: '50px'
    },
    h3: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '42px', 
      fontWeight: 700,
      lineHeight: '50px'
    },
    h4: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '28px',
      fontWeight: 500,
      lineHeight: '40px'
    },
    h5: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '20px'
    },
    h6: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '20px'
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px'
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px'
    },
    caption: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px'
    }
  },
  shape: {
    borderRadius: 8
  }
});

export default theme;