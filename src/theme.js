import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0B91D6',
      light: '#4AABDF',
      dark: '#0A7BC4',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#34A853',
      light: '#5CBF75',
      dark: '#2E9447',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#EF232A',
      light: '#F25A5F',
      dark: '#D61E24',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#FBBC05',
      light: '#FCC947',
      dark: '#E6A804',
      contrastText: '#000000'
    },
    text: {
      primary: '#121927',
      secondary: '#30302E',
      disabled: '#A0A0AA'
    },
    background: {
      default: '#F8F8F8',
      paper: '#FFFFFF'
    },
    grey: {
      50: '#F6F0F0',
      100: '#F0F0F0',
      200: '#E0E0E0',
      300: '#C0C0C0',
      400: '#A0A0AA',
      500: '#808080',
      600: '#606060',
      700: '#404040',
      800: '#202020',
      900: '#121927'
    },
    divider: 'rgba(160, 160, 170, 0.2)'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: '42px',
      fontWeight: 600,
      color: '#000000'
    },
    h2: {
      fontSize: '32px',
      fontWeight: 600,
      color: '#121927'
    },
    h3: {
      fontSize: '28px',
      fontWeight: 600,
      color: '#0B91D6'
    },
    h4: {
      fontSize: '24px',
      fontWeight: 600,
      color: '#121927'
    },
    h5: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#FFFFFF'
    },
    h6: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#121927'
    },
    body1: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#121927'
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      color: '#30302E'
    },
    caption: {
      fontSize: '12px',
      fontWeight: 500,
      color: '#121927'
    }
  },
  shape: {
    borderRadius: 8
  }
});

export default theme;