import {
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DayMood, Note } from '../../redux/types';

type CreateProps = {
  mode: 'create';
};

type EditProps = {
  data: Note;
  mode: 'edit';
};

type FormValues = { date: Date; mood?: DayMood; text: string };

const MAX_TEXT_LENGTH = 256;
const REQUIRED_TEXT = 'Field is required';

const validationSchema = yup.object({
  text: yup
    .string()
    .max(MAX_TEXT_LENGTH, `Max length is ${MAX_TEXT_LENGTH}`)
    .required(REQUIRED_TEXT),
  mood: yup.string().required(REQUIRED_TEXT),
  date: yup.date().required(REQUIRED_TEXT),
});

export const NoteForm = (props: CreateProps | EditProps) => {
  const { mode } = props;

  const renderTitle = () => (
    <h1>{mode === 'edit' ? 'Edit note' : 'Create note'}</h1>
  );

  const getInitialValues = (): FormValues => {
    if (mode === 'edit') {
      const { createdAt, mood, text } = props.data;
      return {
        date: new Date(createdAt),
        mood,
        text,
      };
    } else
      return {
        date: new Date(),
        mood: undefined,
        text: '',
      };
  };

  const formik = useFormik<FormValues>({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '40%' }}>
      {renderTitle()}

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          slotProps={{
            textField: {
              fullWidth: true,
              error: formik.touched.date && Boolean(formik.errors.date),
              helperText:
                formik.touched.date && formik.errors.date ? (
                  <>{formik.errors.date}</>
                ) : null,
              onBlur: formik.handleBlur,
            },
          }}
          sx={{ mb: 3 }}
          value={formik.values.date}
          onChange={(value) => formik.setFieldValue('date', value)}
        />
      </LocalizationProvider>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <FormLabel>Your mood</FormLabel>

        <RadioGroup
          name="mood"
          value={formik.values.mood}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
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
        {formik.touched.mood && Boolean(formik.errors.mood) && (
          <FormHelperText error>{formik.errors.mood}</FormHelperText>
        )}
      </FormControl>
      <TextField
        id="text"
        label="How do you feel?"
        multiline
        rows={3}
        fullWidth
        sx={{ mb: 3 }}
        name="text"
        value={formik.values.text}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.text && Boolean(formik.errors.text)}
        helperText={formik.touched.text && formik.errors.text}
      />
      <Button variant="contained" type="submit">
        Save
      </Button>
    </form>
  );
};
