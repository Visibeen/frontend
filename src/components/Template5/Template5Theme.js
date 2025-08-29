// Template 5 Interior Design Theme
import { createTheme } from '@mui/material/styles';

const template5Theme = createTheme({
  palette: {
    primary: {
      main: '#222838', // Dark blue-gray primary color
      light: '#4a5568',
      dark: '#1a202c',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#fcf9f0', // Light cream background color
      light: '#fefefe',
      dark: '#f7f3ea',
      contrastText: '#222838'
    },
    text: {
      primary: '#222838', // Dark text color
      secondary: 'rgba(0, 0, 0, 0.50)', // Secondary text color
      disabled: '#9e9e9e'
    },
    background: {
      default: '#fcf9f0', // Light cream background
      paper: '#ffffff'
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#ffffff'
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
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
    fontFamily: 'Poppins, Roboto, Rethink Sans, Nunito, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '70px',
      fontWeight: 600,
      lineHeight: '70px',
      textTransform: 'uppercase'
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '64px',
      fontWeight: 500,
      letterSpacing: '-2.24px',
      lineHeight: '70.40px'
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '45px',
      fontWeight: 500,
      lineHeight: '48px',
      textTransform: 'capitalize'
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '22px',
      fontWeight: 400,
      lineHeight: '26px',
      textTransform: 'capitalize'
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '24px',
      textTransform: 'capitalize'
    },
    h6: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '18px',
      fontWeight: 700
    },
    body1: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '22px'
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '29.70px'
    },
    caption: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '16px',
      fontWeight: 400
    },
    overline: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '17px',
      fontWeight: 400,
      letterSpacing: '0.10px'
    },
    button: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '18px',
      fontWeight: 500,
      textTransform: 'capitalize'
    }
  },
  shape: {
    borderRadius: 10
  }
});

export default template5Theme;