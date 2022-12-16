import { Content } from '@application/entities/notification/content';
import { Notification } from '@application/entities/notification/notification';
import { InMemmoryNotificationsRepository } from '@test/repositories/in-memmory-notifications-repository';
import { CancelNotification } from './cancel-notification-use-case';
import { NotificationNotFound } from './errors/notification-not-fount';

describe('Cancel notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const cancelNotificaton = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('invit friend solicitation'),
      recipientId: 'exemple-recipient-id',
    });

    await notificationsRepository.create(notification);

    await cancelNotificaton.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].createdAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const cancelNotificaton = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotificaton.execute({
        notificationId: 'asas-asas-as',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
