// src/App.jsx
import DashboardLayoutBasic from './pages/MainDashboard';
import { useTokenRefresh } from './auth';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Crie o tema baseado no Material-3
const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ee',
    },
    secondary: {
      main: '#03dac6',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
  },
});

function App() {
  useTokenRefresh();
  console.log('App montado, useTokenRefresh iniciado');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
          <DashboardLayoutBasic/>
      </div>
    </ThemeProvider>
  );
}

export default App;
