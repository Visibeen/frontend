import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import ProfileStrengthResults from './components/ProfileStrengthResults/ProfileStrengthResults';
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
        <ProfileStrengthResults />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;