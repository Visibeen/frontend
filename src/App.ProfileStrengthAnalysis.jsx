import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import ProfileStrengthAnalysis from './components/ProfileStrengthAnalysis/ProfileStrengthAnalysis';
import theme from './theme';

const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

const App = () => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <ProfileStrengthAnalysis />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;