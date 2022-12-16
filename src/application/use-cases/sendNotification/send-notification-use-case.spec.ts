import { SendNotification } from './send-notification-use-case';
import { InMemmoryNotificationsRepository } from '@test/repositories/in-memmory-notifications-repository';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const sendNotificaton = new SendNotification(notificationsRepository);
    const { notification } = await sendNotificaton.execute({
      recipientId: 'exemple-recipient-id',
      content: 'invite solicitation friend',
      category: 'social',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
