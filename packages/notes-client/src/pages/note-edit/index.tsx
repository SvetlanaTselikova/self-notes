import React from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { NoteForm } from '../../components';
import {
  UpdateNoteDto,
  useNotesControllerFindAllQuery,
  useNotesControllerUpdateMutation,
} from '../../redux';
import { useParams } from 'react-router-dom';

export const NoteEdit = () => {
  const noteId =
    useParams().noteId || window.location.pathname.split('/')?.pop();
  const { data, isLoading, error } = useNotesControllerFindAllQuery({
    'filter.id': `$eq:${noteId}`,
  });
  const note = data?.data?.[0];
  const [updateNote, { isLoading: isSaving, isError: saveError }] =
    useNotesControllerUpdateMutation();

  const handleEditNote = async (data: UpdateNoteDto) => {
    await updateNote({ id: String(data.id), updateNoteDto: data });
  };

  return (
    <React.Fragment>
      {error ? (
        <Alert severity="error">Oops, somthing went wrong...</Alert>
      ) : isLoading ? (
        <CircularProgress />
      ) : note ? (
        <NoteForm
          mode="edit"
          data={note}
          onSubmit={handleEditNote}
          isSaving={isSaving}
          saveError={saveError}
        />
      ) : null}
    </React.Fragment>
  );
};
