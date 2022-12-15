import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    //foi preciso criar uma nova notificação

    const notification = new Notification({
      category: 'social',
      content: new Content('Isso é uma notificação cancelada'),
      recipientId: 'id-recipient',
    });
    //persistir essa notificação no DB
    await notificationsRepository.create(notification);

    //usar o método de cancelar a notificação
    await cancelNotification.execute({
      notificationId: notification.id,
    });

    //testar se há algum tipo de argumento do tipo Data para cancelar a notificação.
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('shoul be not able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
