import { Injectable } from '@angular/core';
import {
  BaseCommandHandler,
  NotificationCommand,
} from 'libs/clients-message-bus/src/lib/types';
import { NotificationService } from '../services';

@Injectable()
export class NotificationCommandHandler
  implements BaseCommandHandler<NotificationCommand>
{
  constructor(private notificationService: NotificationService) {}

  commandName: NotificationCommand['name'] = 'showNotification';

  execute(data?: NotificationCommand['data']) {
    if (data?.type === 'success') {
      this.notificationService.showSuccessNotification(data?.message);
    }

    if (data?.type === 'error') {
      this.notificationService.showErrorNotification(data?.message);
    }
  }
}
