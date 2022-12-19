import { makeNotification } from '@test/factories/notification-factory';
import { InMemmoryNotificationsRepository } from '@test/repositories/in-memmory-notifications-repository';
import { NotificationNotFound } from '../errors/notification-not-fount';
import { ReadNotification } from '../read-notification/read-notification-use-case';
import { UnReadNotification } from './unread-notification-use-case';

describe('read notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const unreadNotificaton = new UnReadNotification(notificationsRepository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(notification);

    await unreadNotificaton.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const unreadNotificaton = new ReadNotification(notificationsRepository);

    expect(() => {
      return unreadNotificaton.execute({
        notificationId: 'asas-asas-as',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
