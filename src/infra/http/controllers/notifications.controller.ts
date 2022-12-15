import { Body, Controller, Post } from '@nestjs/common';

import { SendNotification } from 'src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

//parte da da API que vai ser consumida no front

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotifaction: SendNotification) {}
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotifaction.execute({
      category,
      content,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTPP(notification),
    };
  }
}
