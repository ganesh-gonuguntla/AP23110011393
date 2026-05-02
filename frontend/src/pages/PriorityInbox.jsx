import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { fetchNotifications } from '../services/api';
import { getPriorityNotifications } from '../utils/priority';
import { NotificationCard } from '../components/NotificationCard';
import { Log } from '../utils/logger';

export const PriorityInbox = () => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchNotifications();
        setAllNotifications(data.notifications || []);
        Log('frontend', 'info', 'page', `Loaded ${data.notifications?.length || 0} notifications for Priority Inbox`);
      } catch (error) {
        Log('frontend', 'error', 'page', `Failed to load priority notifications: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const notifications = React.useMemo(() => {
    return getPriorityNotifications(allNotifications, limit === '' ? 10 : Number(limit), type);
  }, [allNotifications, type, limit]);

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1350, py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="white" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          Priority Inbox
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150, bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={type}
              label="Category"
              onChange={(e) => {
                setType(e.target.value);
                Log('frontend', 'info', 'page', `Priority type filter changed to ${e.target.value || 'All'}`);
              }}
            >
              <MenuItem value=""><em>All Categories</em></MenuItem>
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
              const val = e.target.value;
              if (val === '') {
                setLimit('');
              } else {
                const numVal = parseInt(val);
                if (!isNaN(numVal) && numVal >= 0) {
                  setLimit(numVal);
                }
              }
            }}
            sx={{ width: 100, bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 2 }}
          />
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress sx={{ color: 'white' }} />
        </Box>
      ) : (
        <Box sx={{ minHeight: '60vh' }}>
          {notifications.map((n) => (
            <NotificationCard key={n.ID} notification={n} />
          ))}
          {notifications.length === 0 && (
            <Box sx={{ py: 10, textAlign: 'center' }}>
              <Typography variant="h6" color="white" sx={{ opacity: 0.8 }}>
                No priority notifications found.
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};
