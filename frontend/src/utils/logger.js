import axios from 'axios';

const LOG_URL = '/evaluation-service/logs';
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJnYW5lc2hfZ29udWd1bnRsYUBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDA2NDEsImlhdCI6MTc3NzY5OTc0MSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImJlMTRmNmIzLThmZWEtNGNiZS1hZmFjLTM5MzQ1YjliNjY3MyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImdvbnVndW50bGEgZ2FuZXNoIiwic3ViIjoiOTQ2NjJjZTktOWRiMi00NjkwLWI1ZGMtZGJhNzM5YjJlNjgyIn0sImVtYWlsIjoiZ2FuZXNoX2dvbnVndW50bGFAc3JtYXAuZWR1LmluIiwibmFtZSI6ImdvbnVndW50bGEgZ2FuZXNoIiwicm9sbE5vIjoiYXAyMzExMDAxMTM5MyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6Ijk0NjYyY2U5LTlkYjItNDY5MC1iNWRjLWRiYTczOWIyZTY4MiIsImNsaWVudFNlY3JldCI6IldKZkRCWkV1YmJQTndObmUifQ.z7V23dtUm55PCqzkZtlKYOCD0htHyehVAHpY2wyFz28";

export const Log = async (stack, level, pkg, message) => {
  try {
    const body = {
      stack,
      level,
      package: pkg,
      message,
    };
    await axios.post(LOG_URL, body, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(`[LOG] ${level.toUpperCase()} - ${pkg}: ${message}`);
  } catch (error) {
    console.error('Failed to send log:', error);
  }
};
