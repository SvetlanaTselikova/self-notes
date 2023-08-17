export interface BaseQuery {
  name: string;
  data: any;
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
      messageData: BaseQuery;
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

export interface BaseMessageBus {
  sendQuery: <IQuery extends BaseQuery>(query: IQuery) => void;
  sendCommand: <ICommand extends BaseCommand>(command: ICommand) => void;
  listenCommands: () => void;
}
