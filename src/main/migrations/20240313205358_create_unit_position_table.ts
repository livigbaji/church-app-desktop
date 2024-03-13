import type { Knex } from "knex";
import {UNIT_POSITION_TABLE} from "../configs/constants.ts";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable(UNIT_POSITION_TABLE, (table) => {
        table.uuid('id', {primaryKey: true}).defaultTo(knex.fn.uuid());
        table.uuid('unit');
        table.string('name');
        table.text('description');
        table.boolean('deleted').defaultTo(false);
        table.timestamp('deleted_at').nullable();
        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable(UNIT_POSITION_TABLE);
}

