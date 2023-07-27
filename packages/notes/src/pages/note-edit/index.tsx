import React from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { NoteForm } from '../../components';
import { useGetNoteQuery } from '../../redux';

export const NoteEdit = () => {
  const noteId = '1';
  const { data, isLoading, error } = useGetNoteQuery(noteId);

  return (
    <React.Fragment>
      {error ? (
        <Alert severity="error">Oops, somthing went wrong...</Alert>
      ) : isLoading ? (
        <CircularProgress />
      ) : data ? (
        <NoteForm mode="edit" data={data} />
      ) : null}
    </React.Fragment>
  );
};
