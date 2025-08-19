import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import BusinessProfile from './components/Dashboard/pages/BusinessProfile';
import theme from './theme';

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
        <BusinessProfile />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;