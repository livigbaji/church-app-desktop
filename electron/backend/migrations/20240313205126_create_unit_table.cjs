const UNIT_TABLE = 'units';


module.exports.up =  async function (knex) {
    if (await knex.schema.hasTable(UNIT_TABLE)) {
        return;
    }
    await knex.schema.createTable(UNIT_TABLE, (table) => {
        table.uuid('id', {primaryKey: true}).defaultTo(knex.fn.uuid());
        table.uuid('leader').nullable();
        table.string('name');
        table.text('description');
        table.boolean('deleted').defaultTo(false);
        table.timestamp('deleted_at').nullable();
        table.timestamps({
            useTimestamps: true,
            defaultToNow: true,
        });
    });
}


module.exports.down = async function (knex){
    await knex.schema.dropTable(UNIT_TABLE);
}

