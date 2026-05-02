import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { PriorityInbox } from './pages/PriorityInbox';
import { NotificationProvider } from './context/NotificationContext';
import { Log } from './utils/logger';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Modern blue
    },
    secondary: {
      main: '#7c3aed', // Purple for result
    },
    success: {
      main: '#10b981', // Green for events
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    }
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  useEffect(() => {
    Log('frontend', 'info', 'component', 'Application started');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/priority" element={<PriorityInbox />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
