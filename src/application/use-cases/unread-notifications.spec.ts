import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notifications';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unReadNotification = new UnreadNotification(notificationsRepository);

    //foi preciso criar uma nova notificação

    const notification = makeNotification({
      readAt: new Date(),
    });
    //persistir essa notificação no DB
    await notificationsRepository.create(notification);

    //acessando o método pelo use-Case
    await unReadNotification.execute({
      notificationId: notification.id,
    });

    //testar se há algum tipo de argumento do tipo Data para cancelar a notificação.
    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('shoul be not able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unReadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unReadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
