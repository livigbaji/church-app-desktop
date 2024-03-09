import type { Knex } from 'knex';
import {MEMBERS_TABLE} from '../configs/constants.ts';

export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable(MEMBERS_TABLE, (table) => {
        table.uuid('id', { primaryKey: true });
        table.string('first_name');
        table.string('middle_name').nullable();
        table.string('last_name');
        table.string('marital_status');
        table.string('gender');
        table.string('status');
        table.timestamp('inactive_at').nullable();
        table.timestamp('suspended_at').nullable();
        table.string('home_cell').nullable();
        table.timestamp('joined_unit_at').nullable();
        table.date('joined_commission_at').nullable();
        table.date('new_birth_at').nullable();
        table.date('baptized_at').nullable();
        table.string('occupation');
        table.integer('birth_month');
        table.integer('birth_day');
        table.string('phone_number');
        table.string('address');
        table.string('reference').nullable();
        table.string('qualification');
        table.string('other_unit').nullable();
        table.string('hobbies');
        table.string('next_of_kin_name');
        table.string('next_of_kin_number');
        table.string('village');
        table.string('home_town');
        table.string('lga');
        table.string('state');
        table.boolean('deleted');
        table.timestamp('deleted_at').nullable();
        table.timestamps();
    })
}



export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable(MEMBERS_TABLE);
}

