import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PerformanceDashboard from './components/Performance/PerformanceDashboard';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/performance" replace />} />
          <Route path="/performance" element={<PerformanceDashboard />} />
          <Route path="*" element={<Navigate to="/performance" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;