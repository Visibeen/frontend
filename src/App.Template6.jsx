import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import template6Theme from './components/Template6/Template6Theme';
import Template6 from './components/Template6/Template6';
import { mockRootProps } from './components/Template6/Template6MockData';

function App() {
  return (
    <ThemeProvider theme={template6Theme}>
      <CssBaseline />
      <Template6 
        templateData={mockRootProps}
        isEditable={true}
      />
    </ThemeProvider>
  );
}

export default App;