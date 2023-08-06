import { MigrationInterface, QueryRunner, TableColumn, Table } from 'typeorm';

export class CreateUsersTable1691141551273 implements MigrationInterface {
  protected readonly tableName = 'users';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              CREATE TYPE "user_provider_enum" AS ENUM('vk', 'gmail')
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
            name: 'external_id',
            type: 'integer',
            isNullable: false,
          }),
          new TableColumn({
            name: 'provider',
            type: 'user_provider_enum',
            isNullable: false,
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
    await queryRunner.query('DROP TYPE IF EXISTS "user_provider_enum"');
  }
}
