const UNIT_POSITION_TABLE = 'positions';


module.exports.up = async function (knex){
    if (await knex.schema.hasTable(UNIT_POSITION_TABLE)) {
        return;
    }
    await knex.schema.createTable(UNIT_POSITION_TABLE, (table) => {
        table.uuid('id', {primaryKey: true}).defaultTo(knex.fn.uuid());
        table.uuid('unit');
        table.string('name');
        table.text('description');
        table.boolean('deleted').defaultTo(false);
        table.timestamp('deleted_at').nullable();
        table.timestamps();
    });
}


module.exports.down = async function (knex){
    await knex.schema.dropTable(UNIT_POSITION_TABLE);
}

