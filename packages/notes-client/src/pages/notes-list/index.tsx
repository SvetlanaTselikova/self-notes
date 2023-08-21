import { useNotesControllerFindAllQuery } from '../../redux';
import { CircularProgress, List, Pagination } from '@mui/material';
import { NoteCard } from '../../components/note-card';
import React from 'react';
import styles from './index.module.sass';
import { BaseMessageBus } from '@self-notes/clients-message-bus';

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

  const { data, isLoading } = useNotesControllerFindAllQuery({
    page,
    limit: ITEMS_PER_PAGE,
  });

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
