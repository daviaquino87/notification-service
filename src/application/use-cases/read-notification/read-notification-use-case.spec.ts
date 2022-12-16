import { makeNotification } from '@test/factories/notification-factory';
import { InMemmoryNotificationsRepository } from '@test/repositories/in-memmory-notifications-repository';
import { NotificationNotFound } from '../errors/notification-not-fount';
import { ReadNotification } from './read-notification-use-case';

describe('read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const readNotificaton = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotificaton.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });
});
