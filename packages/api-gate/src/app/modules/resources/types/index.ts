import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { ApiProperty } from '@nestjs/swagger';

export type CreateBody<IEntity> = Partial<IEntity>;
export type UpdateBody<IEntity> = Partial<IEntity>;

export type ResourceCntroller<Entity> = {
  findAll?(query: PaginateQuery): Promise<Paginated<Entity>>;
  create?(body: CreateBody<Entity>): Promise<Entity>;
  update?(id: string, body: UpdateBody<Entity>): Promise<Entity>;
  deleteOne?(id: string): Promise<void>;
};
