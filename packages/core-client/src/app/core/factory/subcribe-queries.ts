import { MessageBus } from '@self-notes/clients-message-bus';

export function subcribeQueries(messageBusService: MessageBus) {
  return () => messageBusService.listenQueries().subscribe();
}
