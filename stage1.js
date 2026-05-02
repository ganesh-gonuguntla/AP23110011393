import { fetchNotifications } from './frontend/src/services/api.js';
import { getPriorityNotifications } from './frontend/src/utils/priority.js';

async function runStage1() {
  console.log('Stage 1: Finding Top 10 Notifications');
  try {
    const data = await fetchNotifications({ limit: 100 });
    const notifications = data.notifications || [];
    
    const top10 = getPriorityNotifications(notifications, 10);
    
    console.log('--- Priority Notifications ---');
    top10.forEach((n, i) => {
      console.log(`${i+1}. [${n.Type}] ${n.Message} (${n.Timestamp})`);
    });
  } catch (error) {
    console.error('Error in Stage 1:', error.message);
  }
}

runStage1();
