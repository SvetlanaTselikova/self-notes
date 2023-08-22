import { configureStore } from '@reduxjs/toolkit';

export const getStore = (api: any) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([api.middleware]),
  });

export type RootState = ReturnType<ReturnType<typeof getStore>['getState']>;
export type AppDispatch = ReturnType<typeof getStore>['dispatch'];
