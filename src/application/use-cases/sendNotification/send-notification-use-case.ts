import { Injectable } from '@nestjs/common';
import { Content } from '@application/entities/notification/content';
import { Notification } from '@application/entities/notification/notification';
import { NotificationRepository } from '@application/repositories/notification-repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}
@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = request;
    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });

    await this.notificationRepository.create(notification);

    return { notification };
  }
}
