import { NOTES_LIST_PATH } from '@self-notes/utils';
import { NoteForm } from '../../components';
import { CreateNoteDto, useNotesControllerCreateMutation } from '../../redux';
import {
  BaseMessageBus,
  NavigateCommand,
} from '@self-notes/clients-message-bus';

type Props = {
  messageBus: BaseMessageBus;
};

export const NoteCreate = (props: Props) => {
  const [createNote, { isError, isLoading }] =
    useNotesControllerCreateMutation();

  const handleAddNote = async (data: CreateNoteDto) => {
    await createNote({
      createNoteDto: data,
    });
    props.messageBus?.sendCommand<NavigateCommand>({
      name: 'navigate',
      data: NOTES_LIST_PATH,
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
