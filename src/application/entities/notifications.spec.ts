import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notificaction', () => {
    const notificaction = new Notification({
      category: 'social',
      content: new Content('Vasco da Gama'),
      recipientId: 'example-recipient-id',
    });
    expect(notificaction).toBeTruthy();
  });
});
