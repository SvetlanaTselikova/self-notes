import { NoteForm } from '../../components';
import { useCreateNoteMutation } from '../../redux';
import { NoteFormValues } from '../../redux/types';

export const NoteCreate = () => {
  const [createNote, { isError, isLoading }] = useCreateNoteMutation();

  const handleAddNote = async (data: NoteFormValues) => {
    await createNote(data);
  };

  return (
    <NoteForm
      mode="create"
      onSubmit={handleAddNote}
      isSaving={isLoading}
      saveError={isError}
    />
  );
};
