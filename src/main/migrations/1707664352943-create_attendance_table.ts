import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {ATTENDANCE_TABLE} from "../configs/constants.ts";

export class CreateAttendanceTable1707664352943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: ATTENDANCE_TABLE,
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isGenerated: true,
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                      name: 'user_id',
                      type: 'varchar'
                    },
                    {
                      name: 'user_type',
                      type: 'varchar'
                    },
                    {
                      name: 'time_in',
                      type: 'timestamp',
                      default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'time_out',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'status',
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
        await queryRunner.dropTable(ATTENDANCE_TABLE);
    }

}
