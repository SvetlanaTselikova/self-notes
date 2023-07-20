import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Note } from "../types";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  // tagTypes: ["Products"],
  endpoints: (builder) => ({
    getNotes: builder.query<{[key: string]:Note}, void>({
      query: () =>"notes",
      transformResponse: (response: { data:  Note[] }) =>
        response.data.reduce((acum, item) => ({...acum, [item.id]: item}), {}),
    }),
    // getNote: builder.query<Note, string>({
    //   query(id) {
    //     return `products/${id}`;
    //   },
    //   transformResponse: (
    //     response: { data: { product: Note } },
    //     _args,
    //     _meta
    //   ) => response.data.product,
    //   providesTags: (_result, _error, id) => [{ type: "Products", id }],
    // }),
    // createNote: builder.mutation<Note, FormData>({
    //   query(data) {
    //     return {
    //       url: "products",
    //       method: "POST",
    //       credentials: "include",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: [{ type: "Products", id: "LIST" }],
    //   transformResponse: (response: { data: { product: Note } }) =>
    //     response.data.product,
    // }),
    // updateNote: builder.mutation<
    //   Note,
    //   { id: string; formData: FormData }
    // >({
    //   query({ id, formData }) {
    //     return {
    //       url: `products/${id}`,
    //       method: "PATCH",
    //       credentials: "include",
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: (result, _error, { id }) =>
    //     result
    //       ? [
    //           { type: "Products", id },
    //           { type: "Products", id: "LIST" },
    //         ]
    //       : [{ type: "Products", id: "LIST" }],
    //   transformResponse: (response: { data: { product: Note } }) =>
    //     response.data.product,
    // }),
    // deleteNote: builder.mutation<null, string>({
    //   query(id) {
    //     return {
    //       url: `products/${id}`,
    //       method: "DELETE",
    //       credentials: "include",
    //     };
    //   },
    //   invalidatesTags: [{ type: "Products", id: "LIST" }],
    // }),
  }),
});

export const {
  // useCreateNoteMutation,
  // useDeleteNoteMutation,
  // useGetNoteQuery,
  useGetNotesQuery,
  usePrefetch,
} = notesApi;

