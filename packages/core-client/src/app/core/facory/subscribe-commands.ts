import { MessageBus } from '@self-notes/clients-message-bus';

export function subcribeCommands(messageBusService: MessageBus) {
  return () => messageBusService.listenCommands().subscribe();
}
