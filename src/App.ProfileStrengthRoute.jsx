import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import BusinessProfile from './components/Dashboard/pages/BusinessProfile';
import ProfileStrengthPage from './components/ProfileStrength/ProfileStrengthPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<ProfileStrengthPage />} />
          <Route path="/business-profile" element={<BusinessProfile />} />
          <Route path="/profile-strength" element={<ProfileStrengthPage />} />
          <Route path="*" element={<ProfileStrengthPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;