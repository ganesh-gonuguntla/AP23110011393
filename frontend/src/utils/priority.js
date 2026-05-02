import { parseISO } from 'date-fns';

// Weights: placement > result > event
const TYPE_WEIGHTS = {
  'Placement': 3,
  'Result': 2,
  'Event': 1,
};

// If timestamp is like "2026-04-22 17:51:30" (missing T), date-fns might complain.
// We can just replace space with T or rely on Date parsing.
const parseDate = (dateStr) => {
  try {
    const isoString = dateStr.replace(' ', 'T');
    return new Date(isoString).getTime();
  } catch(e) {
    return 0;
  }
}

export const getPriorityNotifications = (notifications, limit = 10, typeFilter = '') => {
  let filtered = notifications;
  
  if (typeFilter) {
    filtered = filtered.filter(n => n.Type === typeFilter);
  }
  
  // Sort by weight first, then by timestamp (recency)
  const sorted = [...filtered].sort((a, b) => {
    const weightA = TYPE_WEIGHTS[a.Type] || 0;
    const weightB = TYPE_WEIGHTS[b.Type] || 0;
    
    if (weightA !== weightB) {
      return weightB - weightA; // Higher weight first
    }
    
    // Tie-breaker: recency
    const timeA = parseDate(a.Timestamp);
    const timeB = parseDate(b.Timestamp);
    return timeB - timeA; // Newer first
  });

  return sorted.slice(0, limit);
};
