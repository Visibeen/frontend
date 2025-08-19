import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import all components
import Dashboard from './components/Dashboard/Dashboard';
import Performance from './components/Performance/Performance';
import Reputation from './components/Reputation/Reputation';
import GetEDMsForm from './components/Dashboard/pages/GetEDMs/GetEDMsForm';
import FreeWebsite from './components/FreeWebsite/FreeWebsite';
import ReferEarn from './components/ReferEarn/ReferEarn';
import MyAccountPage from './components/MyAccount';
import AccountNotFound from './components/gmb_accounts/AccountNotFound';
import CreateAccount from './components/gmb_accounts/Create_Account/CreateAccount';

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0B91D6',
      light: '#42A5F5',
      dark: '#0277BD',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#EF232A',
      light: '#FF5252',
      dark: '#C62828',
      contrastText: '#ffffff'
    },
    background: {
      default: '#F8F8F8',
      paper: '#ffffff'
    },
    text: {
      primary: '#121927',
      secondary: '#6b7280'
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
    }
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem'
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem'
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '8px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          borderRadius: '12px'
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/reputation" element={<Reputation />} />
          <Route path="/get-edms" element={<GetEDMsForm />} />
          <Route path="/free-website" element={<FreeWebsite />} />
          <Route path="/refer-earn" element={<ReferEarn />} />
          <Route path="/my-account" element={<MyAccountPage />} />
          <Route path="/account-not-found" element={<AccountNotFound />} />
          <Route path="/create-account" element={<CreateAccount />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;