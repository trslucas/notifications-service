import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notifications';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    //foi preciso criar uma nova notificação

    const notification = makeNotification();
    //persistir essa notificação no DB
    await notificationsRepository.create(notification);

    //acessando o método pelo use-Case
    await readNotification.execute({
      notificationId: notification.id,
    });

    //testar se há algum tipo de argumento do tipo Data para cancelar a notificação.
    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('shoul be not able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
