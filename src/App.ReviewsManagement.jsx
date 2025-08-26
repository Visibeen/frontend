import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import ReviewsManagement from './components/ReviewsManagement/ReviewsManagement';
import DashboardLayout from './components/Layouts/DashboardLayout';
import ReputationBenchmarking from './components/Reputation/ReputationBenchmarking';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<ReputationBenchmarking />} />
          <Route path="/reputation" element={<ReputationBenchmarking />} />
          <Route path="/reviews-management" element={
            <DashboardLayout>
              <ReviewsManagement />
            </DashboardLayout>
          } />
          <Route path="/reviews" element={
            <DashboardLayout>
              <ReviewsManagement />
            </DashboardLayout>
          } />
          <Route path="*" element={<ReputationBenchmarking />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;