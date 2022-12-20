import { CancelNotification } from '@application/use-cases/cancelNotification/cancel-notification-use-case';
import { CountRecipientNotification } from '@application/use-cases/countNotification/count-recipient-notification-use-case';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notificatons/get-recipient-notification-use-case';
import { ReadNotification } from '@application/use-cases/read-notification/read-notification-use-case';
import { UnReadNotification } from '@application/use-cases/unread-notification/unread-notification-use-case';
import { Module } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/sendNotification/send-notification-use-case';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnReadNotification,
  ],
})
export class HttpModule {}
