import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_GATE_URL } from '@self-notes/utils';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_GATE_URL,
    credentials: 'include',
  }),
  endpoints: () => ({}),
  tagTypes: ['Notes'],
});
