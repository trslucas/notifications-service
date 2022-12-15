import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notification: string): Promise<Notification | null>;
  abstract save(notificaction: Notification): Promise<void>;
}
