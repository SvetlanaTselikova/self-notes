import {
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormHelperText,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useFormik } from 'formik';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DayMood, Note, NoteFormValues } from '../../redux/types';
import { ActionStatusSnackbar } from '../action-status-snackbar';

type CommonProps = { isSaving: boolean; saveError: boolean };

type CreateProps = {
  onSubmit: (data: NoteFormValues) => Promise<void>;
  mode: 'create';
} & CommonProps;

type EditProps = {
  onSubmit: (data: Note) => Promise<void>;
  data: Note;
  mode: 'edit';
} & CommonProps;

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
  const { mode, onSubmit, isSaving, saveError } = props;

  const renderTitle = () => (
    <h1>{mode === 'edit' ? 'Edit note' : 'Create note'}</h1>
  );

  const getInitialValues = (): NoteFormValues => {
    if (mode === 'edit') {
      const { date, mood, text } = props.data;
      return {
        date: new Date(date),
        mood,
        text,
      };
    } else
      return {
        date: new Date(),
        mood: DayMood.good,
        text: '',
      };
  };

  const formik = useFormik<NoteFormValues>({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (mode === 'edit') {
        await onSubmit({ id: props.data.id, ...values });
      } else await onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '40%' }}>
      <ActionStatusSnackbar isError={saveError} isLoading={isSaving} />
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
          disabled={formik.isSubmitting}
        />
      </LocalizationProvider>
      <FormControl fullWidth sx={{ mb: 3 }} disabled={formik.isSubmitting}>
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
        disabled={formik.isSubmitting}
        value={formik.values.text}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.text && Boolean(formik.errors.text)}
        helperText={formik.touched.text && formik.errors.text}
      />
      <LoadingButton
        loading={isSaving}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
        type="submit"
      >
        <span>Save</span>
      </LoadingButton>
    </form>
  );
};
