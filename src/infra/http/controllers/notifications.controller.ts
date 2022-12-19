import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/sendNotification/send-notification-use-case';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancelNotification/cancel-notification-use-case';
import { ReadNotification } from '@application/use-cases/read-notification/read-notification-use-case';
import { UnReadNotification } from '@application/use-cases/unread-notification/unread-notification-use-case';
import { CountRecipientNotification } from '@application/use-cases/countNotification/count-recipient-notification-use-case';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notificatons/get-recipient-notification-use-case';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unReadNotification: UnReadNotification,
    private countNotifications: CountRecipientNotification,
    private getNotifications: GetRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFroomRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFroomRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getNotifications.execute({
      recipientId,
    });

    return {
      notification: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unRead(@Param('id') id: string) {
    await this.unReadNotification.execute({ notificationId: id });
  }

  @Post()
  async creat(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
