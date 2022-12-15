import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories /notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];
  //achar pelo ID
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );
    if (!notification) {
      return null;
    }
    return notification;
  }
  //criar notificação
  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  //sobrepor notificação que já está salva no DB

  async save(notificaction: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notificaction.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notificaction;
    }
  }
}
