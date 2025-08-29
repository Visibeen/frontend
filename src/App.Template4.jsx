import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import template4Theme from './components/Template4/Template4Theme';
import Template4 from './components/Template4/Template4';
import { mockRootProps } from './components/Template4/Template4MockData';

function App() {
  return (
    <ThemeProvider theme={template4Theme}>
      <CssBaseline />
      <Template4 
        templateData={mockRootProps}
        isEditable={true}
      />
    </ThemeProvider>
  );
}

export default App;