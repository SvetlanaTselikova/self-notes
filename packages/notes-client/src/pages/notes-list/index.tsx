import { Users, useNotesControllerFindAllQuery } from '../../redux';
import { CircularProgress, List, Pagination } from '@mui/material';
import { NoteCard } from '../../components/note-card';
import React, { useEffect } from 'react';
import styles from './index.module.sass';
import { BaseMessageBus, ProfileQuery } from '@self-notes/clients-message-bus';
import { from, map, tap } from 'rxjs';

const EMPTY_NOTES = 'There are no notes yet.';
const ITEMS_PER_PAGE = 8;

type Props = {
  messageBus: BaseMessageBus;
};

export const NotesList = (props: Props) => {
  const [page, setPage] = React.useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const [userId, setUserId] = React.useState<number | null>(null);

  useEffect(() => {
    props.messageBus
      .sendQuery<ProfileQuery, Users>({ name: 'getProfile' })
      .pipe(
        map((user) => user?.id),
        tap((userId) => {
          setUserId(userId);
        })
      )
      .subscribe();
  }, []);

  const { data, isLoading } = useNotesControllerFindAllQuery(
    {
      page,
      limit: ITEMS_PER_PAGE,
      'filter.createdBy': userId,
    },
    { skip: !userId }
  );

  const pagination = (
    <Pagination
      count={data?.meta?.totalPages}
      page={page}
      onChange={handlePageChange}
      sx={{
        margin: '10px 0',
      }}
    />
  );

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <CircularProgress />
      ) : data?.data ? (
        <React.Fragment>
          <h1 className={styles.header}>My notes</h1>

          {data?.data?.length ? (
            <React.Fragment>
              {pagination}
              <List className={styles.list}>
                {Object.values(data?.data).map((note) => (
                  <NoteCard
                    note={note}
                    key={note.id}
                    messageBus={props.messageBus}
                  />
                ))}
              </List>
            </React.Fragment>
          ) : (
            EMPTY_NOTES
          )}
        </React.Fragment>
      ) : null}
    </div>
  );
};
