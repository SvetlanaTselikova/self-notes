import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import {
  BaseMessageBus,
  NotificationCommand,
} from '@self-notes/clients-message-bus';

export const getErrorHandleMiddleware =
  (messageBus: BaseMessageBus): Middleware =>
  (api: MiddlewareAPI) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const err = action?.payload?.data?.error;
      messageBus.sendCommand<NotificationCommand>({
        name: 'showNotification',
        data: {
          type: 'error',
          message: err,
        },
      });
    }

    return next(action);
  };
