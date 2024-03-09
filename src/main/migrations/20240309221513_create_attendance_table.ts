import type { Knex } from 'knex';
import {ATTENDANCE_TABLE} from '../configs/constants.ts';


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable(ATTENDANCE_TABLE, (table) => {
        table.uuid('id', {primaryKey: true}).defaultTo(knex.fn.uuid());
        table.uuid('user_id');
        table.string('user_type');
        table.timestamp('time_in');
        table.timestamp('time_out').nullable();
        table.string('status');
        table.boolean('deleted').defaultTo(false);
        table.timestamp('deleted_at').nullable();
        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable(ATTENDANCE_TABLE)
}

