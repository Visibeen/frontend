import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import FreeWebsite from './components/FreeWebsite/FreeWebsite';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<FreeWebsite />} />
          <Route path="/free-website" element={<FreeWebsite />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;