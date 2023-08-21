import { NOTES_LIST_PATH } from '@self-notes/utils';
import { NoteForm } from '../../components';
import { CreateNoteDto, useNotesControllerCreateMutation } from '../../redux';
import {
  BaseMessageBus,
  NavigateCommand,
  NotificationCommand,
} from '@self-notes/clients-message-bus';

type Props = {
  messageBus: BaseMessageBus;
};

export const NoteCreate = (props: Props) => {
  const { messageBus } = props;
  const [createNote, { isError, isLoading }] =
    useNotesControllerCreateMutation();

  const handleAddNote = async (data: CreateNoteDto) => {
    await createNote({
      createNoteDto: data,
    }).then((response) => {
      if (!('error' in response)) {
        messageBus.sendCommand<NotificationCommand>({
          name: 'showNotification',
          data: {
            type: 'success',
            message: 'Successfuly created',
          },
        });
        messageBus.sendCommand<NavigateCommand>({
          name: 'navigate',
          data: NOTES_LIST_PATH,
        });
      }
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
