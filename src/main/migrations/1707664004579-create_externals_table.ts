import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {EXTERNALS_TABLE} from "../configs/constants.ts";

export class CreateExternalsTable1707664004579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: EXTERNALS_TABLE,
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isGenerated: true,
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                    },
                    {
                        name: 'middle_name',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                    },
                    {
                      name: 'unit',
                      type: 'varchar',
                      isNullable: true
                    },
                    {
                      name: 'label',
                      type: 'varchar'
                    },
                    {
                        name: 'deleted',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(EXTERNALS_TABLE);
    }

}
