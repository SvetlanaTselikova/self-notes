import { api } from './api';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    notesControllerFindAll: build.query<
      NotesControllerFindAllApiResponse,
      NotesControllerFindAllApiArg
    >({
      query: (queryArg) => ({
        url: `/api/notes`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          search: queryArg.search,
          searchBy: queryArg.searchBy,
          sortBy: queryArg.sortBy,
          'filter.id': queryArg['filter.id'],
          'filter.text': queryArg['filter.text'],
          'filter.dayMood': queryArg['filter.dayMood'],
          'filter.date': queryArg['filter.date'],
          'filter.createdBy': queryArg['filter.createdBy'],
        },
      }),
    }),
    notesControllerCreate: build.mutation<
      NotesControllerCreateApiResponse,
      NotesControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/notes`,
        method: 'POST',
        body: queryArg.createNoteDto,
      }),
    }),
    notesControllerUpdate: build.mutation<
      NotesControllerUpdateApiResponse,
      NotesControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/notes/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.updateNoteDto,
      }),
    }),
    notesControllerDeleteOne: build.mutation<
      NotesControllerDeleteOneApiResponse,
      NotesControllerDeleteOneApiArg
    >({
      query: (queryArg) => ({
        url: `/api/notes/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as notesApi };
export type NotesControllerFindAllApiResponse =
  /** status 200  */ PaginatedResponseDto & {
    data?: Notes[];
  };
export type NotesControllerFindAllApiArg = {
  page?: any;
  limit?: any;
  search?: any;
  searchBy?: string[];
  sortBy?: any;
  'filter.id'?: any;
  'filter.text'?: any;
  'filter.dayMood'?: any;
  'filter.date'?: any;
  'filter.createdBy'?: any;
};
export type NotesControllerCreateApiResponse = /** status 200  */
  | Notes
  | /** status 201  */ Notes;
export type NotesControllerCreateApiArg = {
  createNoteDto: CreateNoteDto;
};
export type NotesControllerUpdateApiResponse = /** status 200  */ Notes;
export type NotesControllerUpdateApiArg = {
  id: string;
  updateNoteDto: UpdateNoteDto;
};
export type NotesControllerDeleteOneApiResponse = unknown;
export type NotesControllerDeleteOneApiArg = {
  id: string;
};
export type PaginatedResponseMetaDto = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: string[];
  searchBy: string[];
  search: string;
  filter?: object;
};
export type PaginatedResponseLinksDto = {
  first?: string;
  previous?: string;
  current: string;
  next?: string;
  last?: string;
};
export type PaginatedResponseDto = {
  meta: PaginatedResponseMetaDto;
  links: PaginatedResponseLinksDto;
};
export type Users = {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  currentHashedRefreshToken?: string;
};
export type Notes = {
  id: number;
  text: string;
  date: string;
  dayMood: 'good' | 'normal' | 'bad';
  createdBy: Users;
};
export type CreateNoteDto = {
  text: string;
  date: string;
  dayMood: 'good' | 'normal' | 'bad';
};
export type UpdateNoteDto = {
  id: number;
  text: string;
  date: string;
  dayMood: 'good' | 'normal' | 'bad';
};
export const {
  useNotesControllerFindAllQuery,
  useNotesControllerCreateMutation,
  useNotesControllerUpdateMutation,
  useNotesControllerDeleteOneMutation,
} = injectedRtkApi;
