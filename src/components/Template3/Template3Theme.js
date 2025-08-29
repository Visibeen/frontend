// Template 3 theme with logistics/transport company styling
import { createTheme } from '@mui/material/styles';

const template3Theme = createTheme({
  palette: {
    primary: {
      main: '#0b91d6', // Blue from design
      light: '#4fc3f7',
      dark: '#0277bd',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ef232a', // Red accent from design
      light: '#ff5722',
      dark: '#c62828',
      contrastText: '#ffffff'
    },
    text: {
      primary: '#140a09', // Dark brown text
      secondary: '#565969', // Gray text
      disabled: '#9e9e9e'
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5'
    },
    success: {
      main: '#0b91d6',
      light: '#4fc3f7',
      dark: '#0277bd',
      contrastText: '#ffffff'
    },
    info: {
      main: '#565969',
      light: '#9e9e9e',
      dark: '#424242',
      contrastText: '#ffffff'
    },
    grey: {
      50: '#fafafa',
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
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '64px',
      fontWeight: 700,
      lineHeight: '70.40px',
      textTransform: 'capitalize'
    },
    h2: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: '57.60px',
      textTransform: 'capitalize'
    },
    h3: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: '36.40px'
    },
    h4: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: '28.60px'
    },
    h5: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '17px',
      fontWeight: 700,
      textTransform: 'capitalize'
    },
    h6: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '18.20px',
      textTransform: 'uppercase'
    },
    body1: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '17px',
      fontWeight: 400,
      lineHeight: '25.50px'
    },
    body2: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '17px',
      fontWeight: 400,
      lineHeight: '25.50px'
    },
    caption: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '14px',
      fontWeight: 400
    },
    overline: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '18.20px',
      textTransform: 'uppercase'
    },
    button: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '17px',
      fontWeight: 700,
      textTransform: 'capitalize'
    }
  },
  shape: {
    borderRadius: 15
  }
});

export default template3Theme;