import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import ProfileStrengthPage from './components/ProfileStrength/ProfileStrengthPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProfileStrengthPage />
    </ThemeProvider>
  );
}

export default App;