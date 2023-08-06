import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateNotesTable1691141561517 implements MigrationInterface {
  protected readonly tableName = 'notes';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              CREATE TYPE "day_mood_enum" AS ENUM('good', 'normal', 'bad')
          `);

    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
            unsigned: true,
            generationStrategy: 'increment',
          }),
          new TableColumn({
            name: 'text',
            type: 'text',
            isNullable: false,
          }),
          new TableColumn({
            name: 'day_mood',
            type: 'day_mood_enum',
            isNullable: false,
          }),
          new TableColumn({
            name: 'created_by',
            type: 'int',
            isNullable: true,
            unsigned: true,
          }),
          new TableColumn({
            name: 'date',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          }),
        ],
        foreignKeys: [
          new TableForeignKey({
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['created_by'],
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
    await queryRunner.query('DROP TYPE IF EXISTS day_mood_enum');
  }
}
