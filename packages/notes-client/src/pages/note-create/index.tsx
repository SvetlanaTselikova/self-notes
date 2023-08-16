import { NoteForm } from '../../components';
import { CreateNoteDto, useNotesControllerCreateMutation } from '../../redux';

export const NoteCreate = () => {
  const [createNote, { isError, isLoading }] =
    useNotesControllerCreateMutation();

  const handleAddNote = async (data: CreateNoteDto) => {
    await createNote({
      createNoteDto: data,
    });
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
