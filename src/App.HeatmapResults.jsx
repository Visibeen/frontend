import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import HeatmapResultsPage from './components/HeatmapResults/HeatmapResultsPage';

// Mock the router hooks for preview
const mockSearchParams = new URLSearchParams('businessName=E2E Networks Limited&keyword=Wooden work&gridSize=5&radius=2&lat=30.7333&lng=76.7794');
const mockNavigate = (path) => console.log('Navigate to:', path);

// Mock React Router hooks
React.useSearchParams = () => [mockSearchParams];
React.useNavigate = () => mockNavigate;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeatmapResultsPage />
    </ThemeProvider>
  );
}

export default App;