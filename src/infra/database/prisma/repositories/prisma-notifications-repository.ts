import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification/notification';
import { NotificationRepository } from '@application/repositories/notification-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}
  findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    this.prismaService.notification.create({
      data: raw,
    });
  }

  save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
