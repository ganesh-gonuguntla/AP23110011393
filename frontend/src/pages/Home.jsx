import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem, Pagination } from '@mui/material';
import { fetchNotifications } from '../services/api';
import { NotificationCard } from '../components/NotificationCard';
import { Log } from '../utils/logger';

export const Home = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const params = { limit, page };
        if (type) params.notification_type = type;
        
        const data = await fetchNotifications(params);
        setNotifications(data.notifications || []);
        Log('frontend', 'info', 'page', `Fetched ${data.notifications?.length || 0} notifications for Home`);
      } catch (error) {
        Log('frontend', 'error', 'page', `Failed to fetch notifications: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [type, page]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          All Notifications
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label="Type"
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
              Log('frontend', 'info', 'page', `Changed filter to ${e.target.value || 'All'}`);
            }}
          >
            <MenuItem value=""><em>All</em></MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {notifications.map((n) => (
            <NotificationCard key={n.ID} notification={n} />
          ))}
          {notifications.length === 0 && (
            <Typography align="center" color="text.secondary">No notifications found.</Typography>
          )}
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination 
              count={10} 
              page={page} 
              onChange={(e, value) => {
                setPage(value);
                Log('frontend', 'info', 'page', `Navigated to page ${value}`);
              }} 
              color="primary" 
            />
          </Box>
        </>
      )}
    </Container>
  );
};
