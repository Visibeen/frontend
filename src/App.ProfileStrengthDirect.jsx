import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import ProfileStrengthPage from './components/ProfileStrength/ProfileStrengthPage';

// Mock the router hooks for preview
const mockSearchParams = new URLSearchParams('businessName=E2E Group Mohali&placeId=123456');
const mockNavigate = (path) => console.log('Navigate to:', path);

// Mock React Router hooks
React.useSearchParams = () => [mockSearchParams];
React.useNavigate = () => mockNavigate;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProfileStrengthPage />
    </ThemeProvider>
  );
}

export default App;