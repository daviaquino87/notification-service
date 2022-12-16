import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../repositories/notification-repository';
import { Notification } from '@application/entities/notification/notification';

interface getRecipientNotificationRequest {
  recipientId: string;
}

interface getRecipientNotificationResponse {
  notifications: Notification[];
}
@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: getRecipientNotificationRequest,
  ): Promise<getRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
