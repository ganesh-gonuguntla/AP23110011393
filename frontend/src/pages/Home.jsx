import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem, Pagination } from '@mui/material';
import { fetchNotifications } from '../services/api';
import { NotificationCard } from '../components/NotificationCard';
import { Log } from '../utils/logger';

export const Home = () => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchNotifications();
        setAllNotifications(data.notifications || []);
        Log('frontend', 'info', 'page', `Loaded ${data.notifications?.length || 0} notifications for Home`);
      } catch (error) {
        Log('frontend', 'error', 'page', `Failed to load notifications: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredNotifications = React.useMemo(() => {
    let result = allNotifications;
    if (type) {
      result = result.filter(n => 
        n.Type?.trim().toLowerCase() === type.trim().toLowerCase()
      );
    }
    return result;
  }, [allNotifications, type]);

  const displayedNotifications = React.useMemo(() => {
    const start = (page - 1) * limit;
    return filteredNotifications.slice(start, start + limit);
  }, [filteredNotifications, page]);

  const pageCount = Math.ceil(filteredNotifications.length / limit) || 1;

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1350, py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="white" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          All Notifications
        </Typography>
        <FormControl size="small" sx={{ minWidth: 150, bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 2 }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select
            value={type}
            label="Filter by Type"
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
              Log('frontend', 'info', 'page', `Filter changed to ${e.target.value || 'All'}`);
            }}
          >
            <MenuItem value=""><em>All Categories</em></MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress sx={{ color: 'white' }} />
        </Box>
      ) : (
        <>
          <Box sx={{ minHeight: '60vh' }}>
            {displayedNotifications.map((n) => (
              <NotificationCard key={n.ID} notification={n} />
            ))}
            {displayedNotifications.length === 0 && (
              <Box sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h6" color="white" sx={{ opacity: 0.8 }}>
                  No notifications found for this category.
                </Typography>
              </Box>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={pageCount} 
              page={page} 
              onChange={(e, value) => {
                setPage(value);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              sx={{ 
                '& .MuiPaginationItem-root': { color: 'white' },
                '& .Mui-selected': { bgcolor: 'rgba(255,255,255,0.3) !important' }
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};
