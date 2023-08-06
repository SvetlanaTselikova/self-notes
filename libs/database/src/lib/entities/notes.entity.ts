import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DayMood } from '../types';
import { Users } from './users.entity';

@Entity()
export class Notes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  text: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: 'CURRENT_TIMESTAMP',
  })
  public date: Date;

  @Column({
    type: 'enum',
    name: 'day_mood',
    enum: DayMood,
    nullable: false,
  })
  public dayMood: DayMood;

  @ManyToOne(() => Users, (item) => item.id)
  @JoinColumn({
    name: 'created_by',
  })
  public createdBy: Users;
}
