import { useNotesControllerFindAllQuery } from '../../redux';
import { Alert, CircularProgress } from '@mui/material';
import { NoteCard } from '../../components/note-card';
import List from '@mui/material/List';
import React from 'react';

export const NotesList = () => {
  const { data, isLoading, error } = useNotesControllerFindAllQuery({
    page: 1,
  });

  return (
    <div>
      {error ? (
        <Alert severity="error">Oops, somthing went wrong...</Alert>
      ) : isLoading ? (
        <CircularProgress />
      ) : data?.data ? (
        <React.Fragment>
          <h1>My notes</h1>

          {data?.data?.length ? (
            <List>
              {Object.values(data?.data).map((note) => (
                <NoteCard note={note} />
              ))}
            </List>
          ) : (
            'There are no notes yet.'
          )}
        </React.Fragment>
      ) : null}
    </div>
  );
};
