import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <AppBar position="static" elevation={0} sx={{ 
      background: 'linear-gradient(90deg, #10002b, #3c096c, #5a189a, #c77dff)'
    }}>
      <Toolbar sx={{ minHeight: 83 }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold',
            fontSize: '2.5rem'
          }}
        >
          Campus Connect
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ fontSize: '1.75rem', mx: 1 }}
          >
            Notifications
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/priority"
            sx={{ fontSize: '1.75rem', mx: 1 }}
          >
            Priority Inbox
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
