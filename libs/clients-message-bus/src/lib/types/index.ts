import { BehaviorSubject, Observable } from 'rxjs';

export interface BaseQuery {
  name: string;
  data?: any;
}

export interface BaseCommand {
  name: string;
  data: any;
}

export enum MessageType {
  query = 'query',
  command = 'command',
}

export type BaseMessage =
  | {
      messageType: MessageType.query;
      messageData: BaseQuery & { querySubject: BehaviorSubject<any> };
    }
  | { messageType: MessageType.command; messageData: BaseCommand };

export type BaseCommandListener = { [commandName: string]: () => any };

export type BaseCommandHandler<ICommand extends BaseCommand> = {
  commandName: ICommand['name'];
  execute: (data: ICommand['data']) => any;
};

export interface NavigateCommand extends BaseCommand {
  name: 'navigate';
  data: string;
}

export interface NotificationCommand extends BaseCommand {
  name: 'showNotification';
  data: {
    type: 'success' | 'error';
    message: string;
  };
}

export interface BaseMessageBus {
  sendQuery: <IQuery extends BaseQuery, IQueryResponse>(
    query: IQuery
  ) => Observable<IQueryResponse>;
  sendCommand: <ICommand extends BaseCommand>(command: ICommand) => void;
  listenCommands: () => void;
}

export interface ProfileQuery extends BaseQuery {
  name: 'getProfile';
}

export type BaseQueryHandler<IQuery extends BaseQuery, IQueryResponse> = {
  queryName: IQuery['name'];
  execute: (
    querySubject: BehaviorSubject<IQueryResponse>,
    data: IQuery['data']
  ) => void;
};
