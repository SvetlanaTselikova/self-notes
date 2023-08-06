import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  paginate,
  Paginated,
} from 'nestjs-paginate';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { CreateBody, UpdateBody } from '../types';

export abstract class ResourceService<Entity extends ObjectLiteral> {
  constructor(
    protected dataSource: DataSource,
    private entityType: EntityTarget<any>
  ) {}

  private getEntityFields() {
    const entityMetadata = this.dataSource.getMetadata(this.entityType);
    const fieldNames = entityMetadata.columns.map(
      (column) => column.propertyName
    );
    return fieldNames;
  }

  private getRepository() {
    return this.dataSource.getRepository(this.entityType);
  }

  public async find(query: PaginateQuery): Promise<Paginated<Entity>> {
    const fieldNames = this.getEntityFields();
    const repository = this.getRepository();
    const filterableColumns = fieldNames.reduce((acum, item) => {
      return {
        ...acum,
        [item]: [FilterSuffix.NOT, Object.values(FilterOperator)],
      };
    }, {});

    return paginate(query, repository, {
      sortableColumns: fieldNames,
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: fieldNames,
      select: fieldNames,
      filterableColumns: filterableColumns,
    });
  }

  public async create(data: CreateBody<Entity>): Promise<Entity> {
    const repository = this.getRepository();
    return repository.save(data);
  }

  public async update(data: UpdateBody<Entity>): Promise<Entity> {
    const repository = this.getRepository();
    return repository.save(data);
  }

  public async remove(id: string): Promise<void> {
    const repository = this.getRepository();
    // await repository.delete(id);
  }
}
