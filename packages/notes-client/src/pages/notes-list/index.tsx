import { useNotesControllerFindAllQuery } from '../../redux';
import { Alert, CircularProgress, List, Pagination } from '@mui/material';
import { NoteCard } from '../../components/note-card';
import React from 'react';
import styles from './index.module.sass';

const EMPTY_NOTES = 'There are no notes yet.';
const ITEMS_PER_PAGE = 8;

export const NotesList = () => {
  const [page, setPage] = React.useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const { data, isLoading, error } = useNotesControllerFindAllQuery({
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
      {error ? (
        <Alert severity="error">Oops, somthing went wrong...</Alert>
      ) : isLoading ? (
        <CircularProgress />
      ) : data?.data ? (
        <React.Fragment>
          <h1 className={styles.header}>My notes</h1>

          {data?.data?.length ? (
            <React.Fragment>
              {pagination}
              <List className={styles.list}>
                {Object.values(data?.data).map((note) => (
                  <NoteCard note={note} key={note.id} />
                ))}
              </List>
              {pagination}
            </React.Fragment>
          ) : (
            EMPTY_NOTES
          )}
        </React.Fragment>
      ) : null}
    </div>
  );
};
