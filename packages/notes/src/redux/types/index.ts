export type Note = {
  id: number;
  text: string;
  mood: DayMood;
  createdAt: Date;
  updatedAt: Date;
};

export enum DayMood {
  good = 'good',
  normal = 'normal',
  bad = 'bad'
}