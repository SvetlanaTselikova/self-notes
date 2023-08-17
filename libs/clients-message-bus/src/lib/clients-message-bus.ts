import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import {
  BaseCommand,
  BaseMessage,
  BaseQuery,
  BaseCommandHandler,
  MessageType,
  BaseMessageBus,
} from './types';

export class MessageBus implements BaseMessageBus {
  messageBusSubject$ = new Subject<BaseMessage>();
  private commandHandlersMap: {
    [commandName: string]: BaseCommandHandler<any>;
  } = {};
  constructor(commandHandlers: BaseCommandHandler<any>[]) {
    this.registerCommandHandlers(commandHandlers);
  }

  private registerCommandHandlers(commandHandlers: BaseCommandHandler<any>[]) {
    this.commandHandlersMap = commandHandlers.reduce((acum, handler) => {
      return {
        ...acum,
        [handler.commandName]: handler,
      };
    }, {});
  }

  public sendQuery = <IQuery extends BaseQuery>(query: IQuery) => {
    this.messageBusSubject$.next({
      messageType: MessageType.query,
      messageData: query,
    });
  };

  public sendCommand = <ICommand extends BaseCommand>(command: ICommand) => {
    this.messageBusSubject$.next({
      messageType: MessageType.command,
      messageData: command,
    });
  };

  private commands$ = this.messageBusSubject$.pipe(
    filter((message) => message.messageType === MessageType.command)
  );

  public listenCommands = () => {
    return this.commands$.pipe(
      tap((message) =>
        this.commandHandlersMap[message.messageData?.name]?.execute(
          message?.messageData?.data
        )
      )
    );
  };

  public queries$ = this.messageBusSubject$.pipe(
    filter((message) => message.messageType === MessageType.query)
  );
}
