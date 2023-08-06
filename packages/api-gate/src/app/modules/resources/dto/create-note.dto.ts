import { Notes, Users } from '@self-notes-frontend/database';
import {
  IsNotEmpty,
  IsEnum,
  IsString,
  MaxLength,
  IsDate,
  IsDateString,
} from 'class-validator';
import { DayMood } from 'libs/database/src/lib/types';

export class CreateNoteDto extends Notes {
  @IsNotEmpty()
  @IsString()
  @MaxLength(65000)
  text: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsEnum(DayMood)
  dayMood: DayMood;

  @IsNotEmpty()
  createdBy: Users;
}
