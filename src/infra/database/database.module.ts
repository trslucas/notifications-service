import { Module } from '@nestjs/common';
import { NotificationsRepository } from 'src/application/repositories /notifications-repository';
import { PrismaService } from './Prisma/prisma.service';
import { PrismaNotificationRepository } from './Prisma/repositories/prisma-notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
