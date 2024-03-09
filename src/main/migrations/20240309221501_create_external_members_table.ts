import type { Knex } from "knex";
import {EXTERNALS_TABLE} from "../configs/constants.ts";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable(EXTERNALS_TABLE, (table) => {
        table.uuid('id', { primaryKey: true });
        table.string('first_name');
        table.string('middle_name').nullable();
        table.string('last_name');
        table.string('unit').nullable();
        table.string('label');
        table.boolean('deleted').defaultTo(false);
        table.timestamp('deleted_at').nullable();
        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable(EXTERNALS_TABLE);
}

