import { configureStore } from "@reduxjs/toolkit";
import { notesApi } from "./services/notes-api";

export const store = configureStore({
  reducer: {
    [notesApi.reducerPath]: notesApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([notesApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;