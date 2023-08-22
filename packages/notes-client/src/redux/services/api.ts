import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { API_GATE_URL } from '@self-notes/utils';
import { NOTES_TAG } from '../constants';
import { API_PREFIX, NOTES_API } from '@self-notes/utils';
import {
  BaseMessageBus,
  NotificationCommand,
  RefreshTokenQuery,
} from '@self-notes/clients-message-bus';
import { lastValueFrom } from 'rxjs';

type Props = {
  messageBus: BaseMessageBus;
};

const getBaseQuery = (messageBus: BaseMessageBus) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: API_GATE_URL,
    credentials: 'include',
  });

  const showErrorMessage = (err: FetchBaseQueryError) => {
    messageBus.sendCommand<NotificationCommand>({
      name: 'showNotification',
      data: {
        type: 'error',
        message: (err?.data as any)?.error,
      },
    });
  };
  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error) {
      if (result.error.status === 401) {
        try {
          await lastValueFrom(
            messageBus.sendQuery<RefreshTokenQuery, void>({
              name: 'refreshToken',
            })
          );
          const newResult = await baseQuery(args, api, extraOptions);
          return newResult;
        } catch {
          showErrorMessage(result.error);
          return result;
        }
      }
      showErrorMessage(result.error);
      return result;
    }

    return result;
  };
};

export const createCustomApi = (props: Props) => {
  const api = createApi({
    baseQuery: getBaseQuery(props.messageBus),
    tagTypes: [NOTES_TAG],
    endpoints: (build) => ({
      notesControllerFindAll: build.query<
        NotesControllerFindAllApiResponse,
        NotesControllerFindAllApiArg
      >({
        query: (queryArg) => ({
          url: `${API_PREFIX}${NOTES_API}`,
          params: {
            page: queryArg.page,
            limit: queryArg.limit,
            search: queryArg.search,
            searchBy: queryArg.searchBy,
            sortBy: queryArg.sortBy,
            'filter.id': queryArg['filter.id'],
            'filter.createdBy': queryArg['filter.createdBy'],
          },
        }),
        providesTags: (result, error, arg) =>
          result?.data
            ? [
                ...result?.data.map(({ id }) => ({ type: NOTES_TAG, id })),
                NOTES_TAG,
              ]
            : [NOTES_TAG],
      }),
      notesControllerCreate: build.mutation<
        NotesControllerCreateApiResponse,
        NotesControllerCreateApiArg
      >({
        query: (queryArg) => ({
          url: `${API_PREFIX}${NOTES_API}`,
          method: 'POST',
          body: queryArg.createNoteDto,
        }),
        invalidatesTags: [NOTES_TAG],
      }),
      notesControllerUpdate: build.mutation<
        NotesControllerUpdateApiResponse,
        NotesControllerUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `${API_PREFIX}${NOTES_API}/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateNoteDto,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: NOTES_TAG, id: arg.id },
        ],
      }),
      notesControllerDeleteOne: build.mutation<
        NotesControllerDeleteOneApiResponse,
        NotesControllerDeleteOneApiArg
      >({
        query: (queryArg) => ({
          url: `${API_PREFIX}${NOTES_API}/${queryArg.id}`,
          method: 'DELETE',
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
          try {
            await queryFulfilled;

            for (const {
              endpointName,
              originalArgs,
            } of api.util.selectInvalidatedBy(getState(), [
              { type: NOTES_TAG, id },
            ])) {
              if (endpointName !== 'notesControllerFindAll') continue;
              dispatch(
                api.util.updateQueryData(
                  'notesControllerFindAll',
                  originalArgs,
                  (draft) => {
                    const newResp = {
                      ...draft,
                      data: draft?.data
                        ? draft.data.filter((item) => String(item.id) !== id)
                        : [],
                    };
                    return newResp;
                  }
                )
              );
            }
          } catch (err) {
            console.log(err);
          }
        },
      }),
    }),
  });

  return {
    ...api,
    api,
  };
};

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
  'filter.createdBy'?: any;
};
export type NotesControllerCreateApiResponse =
  /** status 200  */
  Notes | /** status 201  */ Notes;
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

export enum DayMood {
  good = 'good',
  normal = 'normal',
  bad = 'bad',
}
export type Notes = {
  id: number;
  text: string;
  date: string;
  dayMood: DayMood;
  createdBy: Users;
};
export type CreateNoteDto = {
  text: string;
  date: string;
  dayMood: DayMood;
};
export type UpdateNoteDto = {
  id: number;
  text: string;
  date: string;
  dayMood: DayMood;
};
