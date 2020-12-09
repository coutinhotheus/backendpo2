import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CriarCompras1607436405211 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'compras',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'data_emissao',
            type: 'varchar',
          },
          {
            name: 'id_produto',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'id_fornecedor',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'quantidade',
            type: 'decimal',
          },
          {
            name: 'valor_unitario',
            type: 'decimal',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'compras',
      new TableForeignKey({
        columnNames: ['id_produto'],
        referencedTableName: 'produtos',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'compras',
      new TableForeignKey({
        columnNames: ['id_fornecedor'],
        referencedTableName: 'fornecedores',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('compras');
  }
}
