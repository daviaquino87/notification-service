import { Content } from './content';
describe('Notification content', () => {
  it('should be able to create a notification  content', () => {
    const content = new Content('Nova notificação');
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification with lell than 5 characthers', () => {
    expect(() => new Content('New')).toThrow();
  });

  it('should not be able to create a notification with more than 240 characthers', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
