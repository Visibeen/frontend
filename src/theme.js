import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b91d6',
      light: '#eff6ff',
      dark: '#0980c2',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#fbbc05',
      light: '#fdd835',
      dark: '#f57f17',
      contrastText: '#121927'
    },
    error: {
      main: '#ef232a',
      light: '#ff6b6b',
      dark: '#d32f2f',
      contrastText: '#ffffff'
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#45a049',
      contrastText: '#ffffff'
    },
    text: {
      primary: '#121927',
      secondary: '#a0a0aa',
      disabled: '#f6f0f0'
    },
    background: {
      default: '#f8f8f8',
      paper: '#ffffff'
    },
    grey: {
      50: '#f8f8f8',
      100: '#f6f0f0',
      200: '#e0e0e0',
      300: '#a0a0aa',
      400: '#666666',
      500: '#121927',
      600: '#000000'
    },
    common: {
      black: '#000000',
      white: '#ffffff'
    },
    divider: '#f6f0f0'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: '28px',
      fontWeight: 600,
      color: '#0b91d6'
    },
    h2: {
      fontSize: '24px',
      fontWeight: 600,
      color: '#121927'
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#121927'
    },
    h4: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#121927'
    },
    h5: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#121927'
    },
    h6: {
      fontSize: '14px',
      fontWeight: 500,
      color: '#121927'
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#121927',
      lineHeight: '24px'
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      color: '#121927'
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      color: '#a0a0aa'
    }
  },
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 5px rgba(0, 0, 0, 0.12)',
    '0px 1px 8px rgba(0, 0, 0, 0.12)',
    '0px 2px 4px rgba(0, 0, 0, 0.12)',
    '0px 3px 5px rgba(0, 0, 0, 0.12)',
    '0px 3px 5px rgba(0, 0, 0, 0.16)',
    '0px 4px 5px rgba(0, 0, 0, 0.16)',
    '0px 5px 5px rgba(0, 0, 0, 0.16)',
    '0px 5px 6px rgba(0, 0, 0, 0.16)',
    '0px 6px 6px rgba(0, 0, 0, 0.16)',
    '0px 6px 7px rgba(0, 0, 0, 0.16)',
    '0px 7px 8px rgba(0, 0, 0, 0.16)',
    '0px 7px 8px rgba(0, 0, 0, 0.16)',
    '0px 7px 9px rgba(0, 0, 0, 0.16)',
    '0px 8px 9px rgba(0, 0, 0, 0.16)',
    '0px 8px 10px rgba(0, 0, 0, 0.16)',
    '0px 8px 11px rgba(0, 0, 0, 0.16)',
    '0px 9px 11px rgba(0, 0, 0, 0.16)',
    '0px 9px 12px rgba(0, 0, 0, 0.16)',
    '0px 10px 13px rgba(0, 0, 0, 0.16)',
    '0px 10px 13px rgba(0, 0, 0, 0.16)',
    '0px 10px 14px rgba(0, 0, 0, 0.16)',
    '0px 11px 14px rgba(0, 0, 0, 0.16)',
    '0px 11px 15px rgba(0, 0, 0, 0.16)'
  ]
});

export default theme;