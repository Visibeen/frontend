import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import ReputationBenchmarking from './components/Reputation/ReputationBenchmarking';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<ReputationBenchmarking />} />
          <Route path="/reputation" element={<ReputationBenchmarking />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;