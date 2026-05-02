import React, { createContext, useContext, useState, useEffect } from 'react';
import { Log } from '../utils/logger';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [readIds, setReadIds] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('readNotifications');
    if (stored) {
      setReadIds(JSON.parse(stored));
    }
    Log('frontend', 'info', 'state', 'NotificationContext initialized');
  }, []);

  const markAsRead = (id) => {
    setReadIds((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      localStorage.setItem('readNotifications', JSON.stringify(updated));
      return updated;
    });
    Log('frontend', 'info', 'hook', `Notification ${id} marked as read`);
  };

  const isRead = (id) => readIds.includes(id);

  return (
    <NotificationContext.Provider value={{ readIds, markAsRead, isRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
