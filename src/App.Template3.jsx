import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import template3Theme from './components/Template3/Template3Theme';
import Template3 from './components/Template3/Template3';
import { mockRootProps } from './components/Template3/Template3MockData';

function App() {
  return (
    <ThemeProvider theme={template3Theme}>
      <CssBaseline />
      <Template3 
        templateData={mockRootProps}
        isEditable={true}
      />
    </ThemeProvider>
  );
}

export default App;