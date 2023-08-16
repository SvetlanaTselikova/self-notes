import { Notes } from '@self-notes/database';
import {
  IsEnum,
  IsString,
  MaxLength,
  IsOptional,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
import { DayMood } from 'libs/database/src/lib/types';

type IUpdateNoteDto = Partial<Notes>;

export class UpdateNoteDto implements IUpdateNoteDto {
  @IsNotEmpty()
  id: number;

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
}
