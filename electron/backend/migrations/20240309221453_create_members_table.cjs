const MEMBERS_TABLE = 'members'
module.exports.up = async function(knex) {
    if (await knex.schema.hasTable(MEMBERS_TABLE)) {
        return;
    }
    await knex.schema.createTable(MEMBERS_TABLE, (table) => {
        table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
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
        table.boolean('deleted').defaultTo(false);
        table.timestamp('deleted_at').nullable();
        table.timestamps();
    })
}



module.exports.down = async function (knex) {
   await knex.schema.dropTable(MEMBERS_TABLE);
}
