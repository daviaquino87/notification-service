import { makeNotification } from '@test/factories/notification-factory';
import { InMemmoryNotificationsRepository } from '@test/repositories/in-memmory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notification-use-case';

describe('Get recipient notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
