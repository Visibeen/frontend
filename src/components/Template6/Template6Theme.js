// Template 6 Plumbing Services Theme
import { createTheme } from '@mui/material/styles';

const template6Theme = createTheme({
  palette: {
    primary: {
      main: '#0B91D6', // Blue primary color from design
      light: '#42A5F5',
      dark: '#1565C0',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#00296C', // Dark blue secondary color
      light: '#1976D2',
      dark: '#0D47A1',
      contrastText: '#ffffff'
    },
    text: {
      primary: '#00296C', // Dark blue text
      secondary: '#ffffff', // White text for dark backgrounds
      disabled: '#9CA6C1'
    },
    background: {
      default: '#F4F8FF', // Light blue background
      paper: '#ffffff'
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#ffffff'
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
      contrastText: '#ffffff'
    },
    grey: {
      50: '#F4F8FF',
      100: '#E3F2FD',
      200: '#BBDEFB',
      300: '#90CAF9',
      400: '#64B5F6',
      500: '#42A5F5',
      600: '#2196F3',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1'
    },
    common: {
      black: '#11141B',
      white: '#ffffff'
    },
    divider: '#323B50'
  },
  typography: {
    fontFamily: 'Manrope, Inter, sans-serif',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontFamily: 'Manrope, sans-serif',
      fontSize: '48px',
      fontWeight: 700,
      letterSpacing: '-0.96px',
      lineHeight: '58px'
    },
    h2: {
      fontFamily: 'Manrope, sans-serif',
      fontSize: '40px',
      fontWeight: 700,
      letterSpacing: '-0.80px',
      lineHeight: '48px'
    },
    h3: {
      fontFamily: 'Manrope, sans-serif',
      fontSize: '32px',
      fontWeight: 700,
      letterSpacing: '-0.64px',
      lineHeight: '40px'
    },
    h4: {
      fontFamily: 'Manrope, sans-serif',
      fontSize: '28px',
      fontWeight: 600,
      letterSpacing: '-0.56px',
      lineHeight: '34px'
    },
    h5: {
      fontFamily: 'Manrope, sans-serif',
      fontSize: '24px',
      fontWeight: 700,
      letterSpacing: '-0.48px',
      lineHeight: '30px'
    },
    h6: {
      fontFamily: 'Manrope, sans-serif',
      fontSize: '20px',
      fontWeight: 600,
      letterSpacing: '-0.40px',
      lineHeight: '24px'
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      fontWeight: 400,
      letterSpacing: '-0.36px',
      lineHeight: '28px'
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      letterSpacing: '-0.32px',
      lineHeight: '20px'
    },
    caption: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      letterSpacing: '-0.28px',
      lineHeight: '18px'
    },
    overline: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: '-0.28px'
    },
    button: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      fontWeight: 600,
      letterSpacing: '-0.36px',
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 4
  }
});

export default template6Theme;