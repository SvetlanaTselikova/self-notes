import { BaseMessageBus } from '@self-notes/clients-message-bus';

export enum PAGE_TYPE {
  list = 'list',
  create = 'create',
  edit = 'edit',
}

export type RemoteComponentProps = {
  page: PAGE_TYPE;
  messageBus: BaseMessageBus;
};
