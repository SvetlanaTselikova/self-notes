import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';

export const API_DECORATOR_ENTITY = Symbol('API_ENTITY');

export function Api(entity: EntityClassOrSchema): ClassDecorator {
  return (target): typeof target => {
    Reflect.defineMetadata(API_DECORATOR_ENTITY, entity, target);

    return target;
  };
}

export function PaginateQueryOptions() {
  return applyDecorators(
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'limit', required: false, type: Number }),
    ApiQuery({ name: 'search', required: false }),
    ApiQuery({ name: 'sortBy', required: false }),
    ApiQuery({ name: 'filter', required: false })
  );
}

class PaginatedResponseMetaDto {
  @ApiProperty()
  itemsPerPage: number;
  @ApiProperty()
  totalItems: number;
  @ApiProperty()
  currentPage: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  sortBy: string[][];
  @ApiProperty()
  searchBy: string[];
  @ApiProperty()
  search: string;
  @ApiProperty({ required: false })
  filter?: Record<string, string | string[]>;
}

class PaginatedResponseLinksDto {
  @ApiProperty({ required: false })
  first?: string;
  @ApiProperty({ required: false })
  previous?: string;
  @ApiProperty()
  current: string;
  @ApiProperty({ required: false })
  next?: string;
  @ApiProperty({ required: false })
  last?: string;
}

export class PaginatedResponseDto<T> {
  data: T[];
  @ApiProperty()
  meta: PaginatedResponseMetaDto;
  @ApiProperty()
  links: PaginatedResponseLinksDto;
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(
  dataDto: DataDto
) =>
  applyDecorators(
    ApiExtraModels(PaginatedResponseDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    })
  );
