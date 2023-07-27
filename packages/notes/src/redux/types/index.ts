export type Note = {
  id: number;
  text: string;
  mood: DayMood;
  date: Date;
};

export enum DayMood {
  good = 'good',
  normal = 'normal',
  bad = 'bad',
}

export type NoteFormValues = Pick<Note, 'date' | 'mood' | 'text'>;
