import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import {
  BaseMessageBus,
  NotificationCommand,
  RefreshTokenQuery,
} from '@self-notes/clients-message-bus';
import { from, lastValueFrom } from 'rxjs';

export const getErrorHandleMiddleware =
  (messageBus: BaseMessageBus): Middleware =>
  (api: MiddlewareAPI) =>
  (next) =>
  async (action) => {
    if (isRejectedWithValue(action)) {
      console.log(action);
      if (action?.payload?.status === 401) {
        console.log(111);
        await lastValueFrom(
          messageBus.sendQuery<RefreshTokenQuery, void>({
            name: 'refreshToken',
          })
        ).then(() => {
          console.log(222);
          // return api.dispatch(action.data.arg);
          return next(action);
        });
      } else {
        const err = action?.payload?.data?.error;
        messageBus.sendCommand<NotificationCommand>({
          name: 'showNotification',
          data: {
            type: 'error',
            message: err,
          },
        });
      }
    }

    return next(action);
  };
