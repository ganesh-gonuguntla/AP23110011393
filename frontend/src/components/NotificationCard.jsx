import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import { useNotifications } from '../context/NotificationContext';
import { Log } from '../utils/logger';

const typeColors = {
  Placement: 'primary',
  Result: 'secondary',
  Event: 'success',
};

const typeGradients = {
  Placement: 'linear-gradient(135deg, #fdf0d5 0%, #d4a373 100%)',
  Result: 'linear-gradient(135deg, #fdf0d5 0%, #a3b18a 100%)',
  Event: 'linear-gradient(135deg, #f4acb7 0%, #ffe5d9 100%)',
};

export const NotificationCard = ({ notification }) => {
  const { isRead, markAsRead } = useNotifications();
  const read = isRead(notification.ID);

  const handleMarkAsRead = () => {
    markAsRead(notification.ID);
    Log('frontend', 'info', 'component', `User clicked mark as read for ${notification.ID}`);
  };

  const [date, time] = notification.Timestamp ? notification.Timestamp.split(/[ T]+/) : ['N/A', 'N/A'];

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2, 
        background: typeGradients[notification.Type] || '#fdf0d5',
        border: 'none',
        transition: '0.3s',
        boxShadow: read ? 'none' : '0 4px 12px rgba(0,0,0,0.1)',
        position: 'relative',
        opacity: read ? 0.8 : 1
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        pb: 0
      }}>
        <Chip 
          label={notification.Type} 
          sx={{ 
            bgcolor: '#7b2cbf', 
            color: 'white',
            fontWeight: 'bold'
          }}
          size="small" 
        />
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {date}
        </Typography>
      </Box>
      
      <CardContent sx={{ pt: 1, pb: 0 }}>
        <Typography variant="body1" fontWeight="bold">
          {notification.Message}
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, pt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          {!read && (
            <Button 
              size="small" 
              variant="contained" 
              onClick={handleMarkAsRead}
              sx={{
                backgroundColor: 'white',
                color: '#7b2cbf',
                border: '1px solid transparent',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: 'white',
                  boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                }
              }}
            >
              Mark as Read
            </Button>
          )}
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          {time}
        </Typography>
      </Box>
    </Card>
  );
};
