import { Content } from '@application/entities/notification/content';
import { Notification } from '@application/entities/notification/notification';
import { InMemmoryNotificationsRepository } from '@test/repositories/in-memmory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification-use-case';

describe('count recipient notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const countNotificaton = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('invit friend solicitation'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('invit friend solicitation'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('invit friend solicitation'),
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countNotificaton.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
