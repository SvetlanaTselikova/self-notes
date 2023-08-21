import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, take, tap, map } from 'rxjs/operators';
import {
  BaseCommand,
  BaseMessage,
  BaseQuery,
  BaseCommandHandler,
  MessageType,
  BaseMessageBus,
  BaseQueryHandler,
} from './types';

export class MessageBus implements BaseMessageBus {
  messageBusSubject$ = new Subject<BaseMessage>();
  private commandHandlersMap: {
    [commandName: string]: BaseCommandHandler<any>;
  } = {};

  private queryHandlersMap: {
    [queryName: string]: BaseQueryHandler<any, any>;
  } = {};

  constructor(
    commandHandlers: BaseCommandHandler<any>[],
    queryHandlers: BaseQueryHandler<any, any>[]
  ) {
    this.registerCommandHandlers(commandHandlers);
    this.registerQueryHandlers(queryHandlers);
  }

  private registerCommandHandlers(commandHandlers: BaseCommandHandler<any>[]) {
    this.commandHandlersMap = commandHandlers.reduce((acum, handler) => {
      return {
        ...acum,
        [handler.commandName]: handler,
      };
    }, {});
  }

  private registerQueryHandlers(queryHandlers: BaseQueryHandler<any, any>[]) {
    this.queryHandlersMap = queryHandlers.reduce((acum, handler) => {
      return {
        ...acum,
        [handler.queryName]: handler,
      };
    }, {});
  }

  public sendQuery = <IQuery extends BaseQuery, IQueryResponse>(
    query: IQuery
  ): Observable<IQueryResponse> => {
    const querySubject = new BehaviorSubject<IQueryResponse | null>(null);

    this.messageBusSubject$.next({
      messageType: MessageType.query,
      messageData: {
        ...query,
        querySubject,
      },
    });

    return querySubject.pipe(
      filter((val) => !!val),
      map((val) => val as IQueryResponse),
      take(1)
    );
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

  public listenQueries = () => {
    return this.queries$.pipe(
      tap((message) =>
        this.queryHandlersMap[message.messageData?.name]?.execute(
          (
            message?.messageData as BaseQuery & {
              querySubject: BehaviorSubject<any>;
            }
          )?.querySubject,
          message?.messageData?.data
        )
      )
    );
  };
}
