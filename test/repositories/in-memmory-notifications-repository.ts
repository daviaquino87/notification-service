import { NotificationRepository } from '@application/repositories/notification-repository';
import { Notification } from '@application/entities/notification/notification';

export class InMemmoryNotificationsRepository
  implements NotificationRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
