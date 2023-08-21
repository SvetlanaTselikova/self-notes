import React from 'react';
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemButton,
  Divider,
  IconButton,
} from '@mui/material';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

import { format } from 'date-fns';
import { Notes, useNotesControllerDeleteOneMutation } from '../../redux';
import {
  BaseMessageBus,
  NavigateCommand,
  NotificationCommand,
} from '@self-notes/clients-message-bus';
import { NOTES_EDIT_PATH } from '@self-notes/utils';

type Props = {
  note: Notes;
  messageBus: BaseMessageBus;
};

const IconMoodMap = {
  good: <SentimentVerySatisfiedIcon />,
  bad: <SentimentVeryDissatisfiedIcon />,
  normal: <SentimentNeutralIcon />,
};

export const NoteCard = (props: Props) => {
  const { note, messageBus } = props;
  const { id, text, date, dayMood } = note;
  const [deleteNote, { isError, isLoading: isDeleting }] =
    useNotesControllerDeleteOneMutation();

  const handleDeleteNote = async () => {
    await deleteNote({ id: String(id) }).then((response) => {
      if (!('error' in response)) {
        messageBus.sendCommand<NotificationCommand>({
          name: 'showNotification',
          data: {
            type: 'success',
            message: 'Successfuly removed',
          },
        });
      }
    });
  };

  return (
    <React.Fragment key={id}>
      <ListItem
        disablePadding
        secondaryAction={
          <React.Fragment>
            <IconButton
              onClick={() =>
                props.messageBus.sendCommand<NavigateCommand>({
                  name: 'navigate',
                  data: `${NOTES_EDIT_PATH}/${id}`,
                })
              }
            >
              <EditIcon />
            </IconButton>
            <IconButton disabled={isDeleting} onClick={handleDeleteNote}>
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <ListItemButton style={{ cursor: 'auto' }}>
          <ListItemIcon>{IconMoodMap[dayMood]}</ListItemIcon>
          <ListItemText
            primary={format(new Date(date), 'yyyy-MM-dd hh:mm')}
            secondary={text}
            secondaryTypographyProps={{
              style: {
                whiteSpace: 'normal',
                wordBreak: 'break-all',
                maxWidth: '80%',
              },
            }}
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
};
