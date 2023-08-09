import { useNotesControllerFindAllQuery } from '../../redux';
import { Alert, CircularProgress } from '@mui/material';
import { NoteCard } from '../../components/note-card';
import List from '@mui/material/List';

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
        <List>
          {Object.values(data?.data).map((note) => (
            <NoteCard note={note} />
          ))}
        </List>
      ) : null}
    </div>
  );
};
