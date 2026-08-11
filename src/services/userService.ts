import { NotificationItem, CreatorStats } from '../types';
import { MOCK_NOTIFICATIONS, MOCK_CREATOR_STATS } from './mockData';

class UserService {
  private notifications: NotificationItem[] = [...MOCK_NOTIFICATIONS];

  public async getNotifications(): Promise<NotificationItem[]> {
    await new Promise(res => setTimeout(res, 150));
    return this.notifications;
  }

  public async markNotificationAsRead(id: string): Promise<void> {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.read = true;
    }
  }

  public async getCreatorStats(): Promise<CreatorStats> {
    await new Promise(res => setTimeout(res, 200));
    return MOCK_CREATOR_STATS;
  }
}

export const userService = new UserService();
