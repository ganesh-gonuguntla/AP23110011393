import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import { useNotifications } from '../context/NotificationContext';
import { Log } from '../utils/logger';

const typeColors = {
  Placement: 'primary',
  Result: 'secondary',
  Event: 'success',
};

export const NotificationCard = ({ notification }) => {
  const { isRead, markAsRead } = useNotifications();
  const read = isRead(notification.ID);

  const handleMarkAsRead = () => {
    markAsRead(notification.ID);
    Log('frontend', 'info', 'component', `User clicked mark as read for ${notification.ID}`);
  };

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2, 
        bgcolor: read ? 'background.default' : '#f0f7ff',
        borderColor: read ? 'divider' : 'primary.light',
        borderWidth: read ? 1 : 2,
        transition: '0.3s',
        boxShadow: read ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip 
            label={notification.Type} 
            color={typeColors[notification.Type] || 'default'} 
            size="small" 
          />
          <Typography variant="caption" color="text.secondary">
            {notification.Timestamp}
          </Typography>
        </Box>
        <Typography variant="body1" fontWeight={read ? 'normal' : 'bold'} gutterBottom sx={{ mt: 1 }}>
          {notification.Message}
        </Typography>
        {!read && (
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Button size="small" variant="outlined" onClick={handleMarkAsRead}>Mark as Read</Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
