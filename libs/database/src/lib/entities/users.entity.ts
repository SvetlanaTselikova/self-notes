import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  @Column({
    name: 'refresh_token',
  })
  public currentHashedRefreshToken?: string;
}
