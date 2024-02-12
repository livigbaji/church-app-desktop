import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {MEMBERS_TABLE} from "../configs/constants.ts";

export class CreateMembersTable1707605987025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: MEMBERS_TABLE,
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
                        name: 'marital_status',
                        type: 'varchar',
                    },
                    {
                        name: 'gender',
                        type: 'varchar',
                    },
                    {
                        name: 'inactive_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'suspended_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                    },
                    {
                        name: 'home_cell',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'joined_unit_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'joined_commission_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'new_birth_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'baptized_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                      name: 'occupation',
                      type: 'varchar'
                    },
                    {
                        name: 'birth_month',
                        type: 'integer'
                    },
                    {
                        name: 'birth_day',
                        type: 'integer'
                    },
                    {
                        name: 'phone_number',
                        type: 'varchar'
                    },
                    {
                        name: 'address',
                        type: 'varchar'
                    },
                    {
                        name: 'reference',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'qualification',
                        type: 'varchar'
                    },
                    {
                        name: 'other_unit',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'hobbies',
                        type: 'varchar',
                    },
                    {
                        name: 'next_of_kin_name',
                        type: 'varchar',
                    },
                    {
                        name: 'next_of_kin_number',
                        type: 'varchar',
                    },
                    {
                        name: 'village',
                        type: 'varchar',
                    },
                    {
                        name: 'home_town',
                        type: 'varchar',
                    },
                    {
                        name: 'lga',
                        type: 'varchar',
                    },
                    {
                        name: 'state',
                        type: 'varchar',
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
        await queryRunner.dropTable(MEMBERS_TABLE);
    }

}
