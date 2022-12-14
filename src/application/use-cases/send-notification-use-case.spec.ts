import { SendNotification } from './send-notification-use-case';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotificaton = new SendNotification();
    const { notification } = await sendNotificaton.execute({
      recipientId: 'exemple-recipient-id',
      content: 'invite solicitation friend',
      category: 'social',
    });

    expect(notification).toBeTruthy();
  });
});
