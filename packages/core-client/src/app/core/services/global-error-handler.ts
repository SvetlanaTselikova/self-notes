import { ErrorHandler, Injectable } from '@angular/core';
import { NotificationService } from './notification';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private notificationService: NotificationService) {}

  handleError(error: string) {
    this.notificationService.showErrorNotification(error);
  }
}
