import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import './index.css';
import theme from './theme';
import PerformanceDashboard from './components/Performance/PerformanceDashboard';

function App() {
  const handleExportToPDF = () => {
    console.log('Export to PDF functionality would be implemented here');
  };

  const handleTimeRangeChange = (timeRange) => {
    console.log('Time range changed:', timeRange);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PerformanceDashboard
        onExportToPDF={handleExportToPDF}
        onTimeRangeChange={handleTimeRangeChange}
        selectedTimeRange="6 Month"
      />
    </ThemeProvider>
  );
}

export default App;