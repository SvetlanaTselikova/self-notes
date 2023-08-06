import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const API_DECORATOR_ENTITY = Symbol('API_ENTITY');

export function Api(entity: EntityClassOrSchema): ClassDecorator {
  return (target): typeof target => {
    Reflect.defineMetadata(API_DECORATOR_ENTITY, entity, target);

    return target;
  };
}
