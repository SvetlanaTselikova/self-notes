import { useGetNotesQuery } from '../../redux';
import { Alert, CircularProgress } from '@mui/material';
import { NoteCard } from '../../components/note-card';
import List from '@mui/material/List';

const NotesList = () => {
  const { data, isLoading, error } = useGetNotesQuery();

  return (
    <div>
      {error ? (
        <Alert severity="error">Oops, somthing went wrong...</Alert>
      ) : isLoading ? (
        <CircularProgress />
      ) : data ? (
        <List>
          {Object.values(data).map((note) => (
            <NoteCard note={note} />
          ))}
        </List>
      ) : null}
    </div>
  );
};

export default NotesList;
