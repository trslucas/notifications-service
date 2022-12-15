import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a notificaction content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notificaction content with less then 5 characters', () => {
    expect(() => new Content('Voce')).toThrow();
  });

  it('should not be able to create a notificaction content with more then 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
