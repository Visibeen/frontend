// Template 4 Real Estate Theme
import { createTheme } from '@mui/material/styles';

const template4Theme = createTheme({
  palette: {
    primary: {
      main: '#171717', // Dark text color
      light: '#424242',
      dark: '#000000',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#efb817', // Gold/yellow accent color
      light: '#fdd835',
      dark: '#c49000',
      contrastText: '#000000'
    },
    text: {
      primary: '#171717', // Main text color
      secondary: '#565969', // Secondary text color
      disabled: '#9e9e9e'
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
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
    },
    divider: '#dadada'
  },
  typography: {
    fontFamily: 'Rethink Sans, DM Sans, Poppins, sans-serif',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontFamily: 'Rethink Sans, sans-serif',
      fontSize: '90px',
      fontWeight: 500,
      letterSpacing: '-3.15px',
      lineHeight: '99px'
    },
    h2: {
      fontFamily: 'Rethink Sans, sans-serif',
      fontSize: '64px',
      fontWeight: 500,
      letterSpacing: '-2.24px',
      lineHeight: '70.40px'
    },
    h3: {
      fontFamily: 'Rethink Sans, sans-serif',
      fontSize: '28px',
      fontWeight: 500,
      letterSpacing: '-0.70px'
    },
    h4: {
      fontFamily: 'Rethink Sans, sans-serif',
      fontSize: '18px',
      fontWeight: 500,
      letterSpacing: '0.15px',
      textTransform: 'uppercase'
    },
    h5: {
      fontFamily: 'Rethink Sans, sans-serif',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '18px'
    },
    h6: {
      fontFamily: 'Rethink Sans, sans-serif',
      fontSize: '16px',
      fontWeight: 500,
      letterSpacing: '0.15px',
      textTransform: 'uppercase'
    },
    body1: {
      fontFamily: 'Rethink Sans, sans-serif',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '29.70px'
    },
    body2: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '17px',
      fontWeight: 400,
      lineHeight: '25.50px'
    },
    caption: {
      fontFamily: 'Rethink Sans, sans-serif',
      fontSize: '28px',
      fontWeight: 400,
      letterSpacing: '-0.70px',
      lineHeight: '42px'
    },
    overline: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '18px',
      fontWeight: 500,
      textTransform: 'capitalize'
    },
    button: {
      fontFamily: 'Rethink Sans, sans-serif',
      fontSize: '16px',
      fontWeight: 500,
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 16
  }
});

export default template4Theme;