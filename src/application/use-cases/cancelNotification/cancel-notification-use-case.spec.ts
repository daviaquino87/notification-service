import { makeNotification } from '@test/factories/notification-factory';
import { InMemmoryNotificationsRepository } from '@test/repositories/in-memmory-notifications-repository';
import { NotificationNotFound } from '../errors/notification-not-fount';
import { CancelNotification } from './cancel-notification-use-case';

describe('Cancel notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const cancelNotificaton = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

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
