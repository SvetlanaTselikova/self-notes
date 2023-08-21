import { configureStore } from '@reduxjs/toolkit';
import { notesApi } from './services/notes-api';
import { getErrorHandleMiddleware } from './middlewares/error-handle.middleware';
import { BaseMessageBus } from '@self-notes/clients-message-bus';

type StoreProps = { messageBus: BaseMessageBus };

export const getStore = (props: StoreProps) =>
  configureStore({
    reducer: {
      [notesApi.reducerPath]: notesApi.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        notesApi.middleware,
        getErrorHandleMiddleware(props.messageBus),
      ]),
  });

export type RootState = ReturnType<ReturnType<typeof getStore>['getState']>;
export type AppDispatch = ReturnType<typeof getStore>['dispatch'];
