import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Note, NoteFormValues } from '../types';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  // tagTypes: ["Products"],
  endpoints: (builder) => ({
    getNotes: builder.query<{ [key: string]: Note }, void>({
      query: () => 'notes',
      transformResponse: (response: { data: Note[] }) =>
        response.data.reduce(
          (acum, item) => ({ ...acum, [item.id]: item }),
          {}
        ),
    }),
    getNote: builder.query<Note, string>({
      query(id) {
        return `notes/${id}`;
      },
      transformResponse: (response: { data: Note }, _args, _meta) =>
        response.data,
    }),
    createNote: builder.mutation<Note, NoteFormValues>({
      query(data) {
        return {
          url: 'notes',
          method: 'POST',
          credentials: 'include',
          body: data,
        };
      },
      transformResponse: (response: { data: Note }) => response.data,
    }),
    updateNote: builder.mutation<Note, Note>({
      query(data) {
        return {
          url: `notes/${data.id}`,
          method: 'PATCH',
          credentials: 'include',
          body: data,
        };
      },
      transformResponse: (response: { data: Note }) => response.data,
    }),
    deleteNote: builder.mutation<null, string>({
      query(id) {
        return {
          url: `notes/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
  useGetNoteQuery,
  useGetNotesQuery,
  usePrefetch,
} = notesApi;
