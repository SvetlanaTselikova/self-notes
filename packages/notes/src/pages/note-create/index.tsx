import React from 'react';
import {
  FormControl,
  InputLabel,
  TextField,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DayMood, Note } from '../../redux/types';

type CreateProps = {
  data: Note;
  mode: 'edit';
};

type EditProps = {
  mode: 'create';
};

export const NoteCreate = (props: CreateProps | EditProps) => {
  const { mode } = props;

  const renderTitle = () => (
    <h1>{mode === 'edit' ? 'Edit note' : 'Create note'}</h1>
  );

  return (
    <Stack spacing={4} width={'40%'}>
      {renderTitle()}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker label="Date" />
      </LocalizationProvider>
      <FormControl>
        <FormLabel>Your mood</FormLabel>
        <RadioGroup aria-label="icons" name="icons">
          <FormControlLabel
            value={DayMood.good}
            control={
              <Radio
                icon={<SentimentVerySatisfiedIcon />}
                checkedIcon={<SentimentVerySatisfiedIcon />}
              />
            }
            label="Good"
          />
          <FormControlLabel
            value={DayMood.normal}
            control={
              <Radio
                icon={<SentimentNeutralIcon />}
                checkedIcon={<SentimentNeutralIcon />}
              />
            }
            label="Normal"
          />
          <FormControlLabel
            value={DayMood.bad}
            control={
              <Radio
                icon={<SentimentVeryDissatisfiedIcon />}
                checkedIcon={<SentimentVeryDissatisfiedIcon />}
              />
            }
            label="Bad"
          />
        </RadioGroup>
      </FormControl>
      <TextField id="text" label="How do you feel?" multiline rows={3} />
    </Stack>
  );
};
