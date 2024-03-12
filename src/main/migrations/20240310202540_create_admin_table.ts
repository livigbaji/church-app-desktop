import type { Knex } from 'knex';
import {ADMIN_TABLE} from "../configs/constants.ts";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable(ADMIN_TABLE, (table) => {
        table.uuid('id', {primaryKey: true}).defaultTo(knex.fn.uuid());
        table.uuid('user_id');
        table.string('pin');
        table.boolean('deleted').defaultTo(false);
        table.timestamp('deleted_at').nullable();
        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable(ADMIN_TABLE);
}

