import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0B91D6',
      light: '#EFF6FF',
      dark: '#0980C2',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#121927',
      light: '#30302E',
      dark: '#000000',
      contrastText: '#ffffff'
    },
    success: {
      main: '#34A853',
      light: '#10B981',
      dark: '#059669',
      contrastText: '#ffffff'
    },
    error: {
      main: '#EF232A',
      light: '#EF4444',
      dark: '#DC2626',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
      contrastText: '#000000'
    },
    text: {
      primary: '#121927',
      secondary: '#30302E',
      disabled: '#A0A0AA'
    },
    background: {
      default: '#F8F8F8',
      paper: '#ffffff'
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    common: {
      black: '#000000',
      white: '#ffffff'
    },
    divider: '#F6F0F0'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '28px',
      fontWeight: 600,
      color: '#0B91D6'
    },
    h2: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '26px',
      fontWeight: 600,
      color: '#30302E'
    },
    h3: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '20px',
      fontWeight: 500,
      color: '#121927'
    },
    h4: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: 600,
      color: '#121927'
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      color: '#121927'
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      color: '#121927'
    },
    caption: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '10px',
      fontWeight: 400,
      color: '#0B91D6'
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.08)',
    '0 1px 6px rgba(0,0,0,0.12)',
    '0 2px 12px rgba(0,0,0,0.16)',
    '0 4px 20px rgba(0,0,0,0.20)',
    '0 8px 32px rgba(0,0,0,0.24)',
    '0 12px 48px rgba(0,0,0,0.28)',
    '0 16px 64px rgba(0,0,0,0.32)',
    '0 20px 80px rgba(0,0,0,0.36)',
    '0 24px 96px rgba(0,0,0,0.40)',
    '0 28px 112px rgba(0,0,0,0.44)',
    '0 32px 128px rgba(0,0,0,0.48)',
    '0 36px 144px rgba(0,0,0,0.52)',
    '0 40px 160px rgba(0,0,0,0.56)',
    '0 44px 176px rgba(0,0,0,0.60)',
    '0 48px 192px rgba(0,0,0,0.64)',
    '0 52px 208px rgba(0,0,0,0.68)',
    '0 56px 224px rgba(0,0,0,0.72)',
    '0 60px 240px rgba(0,0,0,0.76)',
    '0 64px 256px rgba(0,0,0,0.80)',
    '0 68px 272px rgba(0,0,0,0.84)',
    '0 72px 288px rgba(0,0,0,0.88)',
    '0 76px 304px rgba(0,0,0,0.92)',
    '0 80px 320px rgba(0,0,0,0.96)',
    '0 84px 336px rgba(0,0,0,1.00)'
  ]
});

export default theme;