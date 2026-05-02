import axios from 'axios';

const NOTIFICATION_API = '/evaluation-service/notifications';
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJnYW5lc2hfZ29udWd1bnRsYUBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc2OTgyODIsImlhdCI6MTc3NzY5NzM4MiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImExM2JkNmMzLTc4OGQtNDYyYS05OWI4LWVmNTczMTg0NDAzMSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImdvbnVndW50bGEgZ2FuZXNoIiwic3ViIjoiOTQ2NjJjZTktOWRiMi00NjkwLWI1ZGMtZGJhNzM5YjJlNjgyIn0sImVtYWlsIjoiZ2FuZXNoX2dvbnVndW50bGFAc3JtYXAuZWR1LmluIiwibmFtZSI6ImdvbnVndW50bGEgZ2FuZXNoIiwicm9sbE5vIjoiYXAyMzExMDAxMTM5MyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6Ijk0NjYyY2U5LTlkYjItNDY5MC1iNWRjLWRiYTczOWIyZTY4MiIsImNsaWVudFNlY3JldCI6IldKZkRCWkV1YmJQTndObmUifQ.7cRxOM-2o9Sjz6mi9ybjq3dRrjuDLT5J656Fw33oEGc";

export const fetchNotifications = async (params = {}) => {
  try {
    const response = await axios.get(NOTIFICATION_API, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
