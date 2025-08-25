import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import FreeWebsite from './components/FreeWebsite/FreeWebsite';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0B91D6',
      light: '#42A5F5',
      dark: '#0277BD',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#E53E3E',
      light: '#EF5350',
      dark: '#C53030',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8F8F8',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#6b7280',
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
      900: '#111827',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FreeWebsite />
    </ThemeProvider>
  );
}

export default App;