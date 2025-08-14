import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import GetEDMsForm from './components/Dashboard/pages/GetEDMs/GetEDMsForm';
import UploadLogo from './components/Dashboard/pages/GetEDMs/UploadLogo';

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
          <Routes>
            <Route path="/" element={<GetEDMsForm />} />
            <Route path="/get-edms" element={<GetEDMsForm />} />
            <Route path="/upload-logo" element={<UploadLogo />} />
            <Route path="*" element={<GetEDMsForm />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;