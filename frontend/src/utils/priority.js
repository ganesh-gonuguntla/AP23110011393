import { parseISO } from 'date-fns';

const TYPE_WEIGHTS = {
  'placement': 3,
  'result': 2,
  'results': 2,
  'event': 1,
};

const parseDate = (dateStr) => {
  try {
    if (!dateStr) return 0;
    const isoString = dateStr.replace(' ', 'T');
    const time = new Date(isoString).getTime();
    return isNaN(time) ? 0 : time;
  } catch(e) {
    return 0;
  }
}

export const getPriorityNotifications = (notifications, limit = 10, typeFilter = '') => {
  let filtered = notifications;
  
  if (typeFilter) {
    filtered = filtered.filter(n => 
      n.Type?.trim().toLowerCase() === typeFilter.trim().toLowerCase()
    );
  }
  
  const sorted = [...filtered].sort((a, b) => {
    const typeA = a.Type?.trim().toLowerCase() || '';
    const typeB = b.Type?.trim().toLowerCase() || '';
    const weightA = TYPE_WEIGHTS[typeA] || (typeA ? 0 : -1);
    const weightB = TYPE_WEIGHTS[typeB] || (typeB ? 0 : -1);
    
    if (weightA !== weightB) {
      return weightB - weightA;    }
    
    const timeA = parseDate(a.Timestamp);
    const timeB = parseDate(b.Timestamp);
    return timeB - timeA;  });

  return sorted.slice(0, limit);
};
