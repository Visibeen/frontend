import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import Template1 from './components/Template1/Template1';
import { mockRootProps } from './components/Template1/Template1MockData';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Template1 
        templateData={mockRootProps}
        isEditable={true}
      />
    </ThemeProvider>
  );
}

export default App;