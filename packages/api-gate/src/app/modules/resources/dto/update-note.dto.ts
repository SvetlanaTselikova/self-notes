import { Notes, Users } from '@self-notes-frontend/database';
import {
  IsEnum,
  IsString,
  MaxLength,
  IsOptional,
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
import { DayMood } from 'libs/database/src/lib/types';

export class UpdateNoteDto extends Notes {
  @IsOptional()
  @IsString()
  @MaxLength(65000)
  text: string;

  @IsOptional()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsEnum(DayMood)
  dayMood: DayMood;

  @IsEmpty()
  createdBy: Users;
}
