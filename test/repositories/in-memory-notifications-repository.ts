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
  //retornar lista de notificações de um usuário
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }
  //contar notificações
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
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
