import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import template5Theme from './components/Template5/Template5Theme';
import Template5 from './components/Template5/Template5';
import { mockRootProps } from './components/Template5/Template5MockData';

function App() {
  return (
    <ThemeProvider theme={template5Theme}>
      <CssBaseline />
      <Template5 
        templateData={mockRootProps}
        isEditable={true}
      />
    </ThemeProvider>
  );
}

export default App;