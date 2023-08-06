import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsEmpty,
  IsNotEmpty,
  IsEnum,
  IsString,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { UserProvider } from '../types';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Column({
    name: 'external_id',
    nullable: false,
  })
  externalId: number;

  @IsNotEmpty()
  @IsEnum(UserProvider)
  @Column({
    type: 'enum',
    enum: UserProvider,
    nullable: false,
  })
  public provider: UserProvider;

  @IsEmpty()
  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;
}
