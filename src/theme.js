// Theme updates for login page design
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0B91D6', // Blue from gradient
      light: '#4FC3F7',
      dark: '#0277BD'
    },
    secondary: {
      main: '#EF232A', // Red from gradient  
      light: '#FF5722',
      dark: '#C62828'
    },
    background: {
      default: '#F8F8F8',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#121927',
      secondary: '#A0A0AA'
    },
    error: {
      main: '#EF232A'
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: {
      fontSize: '26px',
      fontWeight: 600,
      color: '#121927'
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      color: '#121927'
    },
    caption: {
      fontSize: '10px',
      fontWeight: 400
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600
        }
      }
    }
  }
});

export default theme;