import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import DashboardLayout from './components/Layouts/DashboardLayout';
import SelectDesignPage from './components/edms/visibeen/SelectDesignPage';
import { AccountProvider } from './components/edms/visibeen/AccountContext';

const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

function App() {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <DashboardLayout>
            <AccountProvider>
              <SelectDesignPage />
            </AccountProvider>
          </DashboardLayout>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;