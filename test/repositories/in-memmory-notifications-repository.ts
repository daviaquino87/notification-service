import { NotificationRepository } from '@application/repositories/notification-repository';
import { Notification } from '@application/entities/notification/notification';

export class InMemmoryNotificationsRepository
  implements NotificationRepository
{
  public notifications: Notification[] = [];

  async findById(
    notificationId: string,
  ): Promise<Notification | null | undefined> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      null;
    }

    return notification;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }
}
