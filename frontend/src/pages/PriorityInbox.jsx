import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { fetchNotifications } from '../services/api';
import { getPriorityNotifications } from '../utils/priority';
import { NotificationCard } from '../components/NotificationCard';
import { Log } from '../utils/logger';

export const PriorityInbox = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchNotifications({ limit: 100 }); 
        const allNotifs = data.notifications || [];
        
        const priorityNotifs = getPriorityNotifications(allNotifs, limit, type);
        setNotifications(priorityNotifs);
        Log('frontend', 'info', 'page', `Processed priority inbox: got ${priorityNotifs.length} items`);
      } catch (error) {
        Log('frontend', 'error', 'page', `Failed to process priority notifications: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [type, limit]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" mb={3} color="primary">
        Priority Inbox
      </Typography>
      
      <Box display="flex" gap={2} mb={4}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label="Type"
            onChange={(e) => {
              setType(e.target.value);
              Log('frontend', 'info', 'page', `Priority type filter changed to ${e.target.value || 'All'}`);
            }}
          >
            <MenuItem value=""><em>All</em></MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          size="small"
          type="number"
          label="Top N"
          value={limit}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val > 0) {
              setLimit(val);
              Log('frontend', 'info', 'page', `Priority limit changed to ${val}`);
            }
          }}
          sx={{ width: 100 }}
        />
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
            <Typography align="center" color="text.secondary">No priority notifications found.</Typography>
          )}
        </>
      )}
    </Container>
  );
};
