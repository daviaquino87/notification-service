import {
  Notification,
  NotificationsProps,
} from '@application/entities/notification/notification';
import { Content } from '@application/entities/notification/content';

type override = Partial<NotificationsProps>;

export function makeNotification(override: override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('invit friend solicitation'),
    recipientId: 'recipient-2',
    ...override,
  });
}
