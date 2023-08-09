import { Notes } from '../services';

export type NoteFormValues = Pick<Notes, 'dayMood' | 'text'> & { date: Date };
