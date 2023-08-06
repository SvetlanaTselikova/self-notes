import { ArgumentMetadata, NotFoundException, mixin } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource } from 'typeorm';

export const ExistValidationPipe = (entityClass: EntityClassOrSchema) => {
  class ExistValidationMixinPipe {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
    async transform(id: string, metadata: ArgumentMetadata): Promise<string> {
      const entity = await this.dataSource
        .getRepository(entityClass)
        .findOneBy({ id });

      if (!entity) {
        throw new NotFoundException();
      }
      return id;
    }
  }
  return mixin(ExistValidationMixinPipe);
};
