import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Campus Connect
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Notifications
          </Button>
          <Button color="inherit" component={Link} to="/priority" sx={{ ml: 1 }}>
            Priority Inbox
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
