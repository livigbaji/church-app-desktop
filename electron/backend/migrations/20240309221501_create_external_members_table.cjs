const EXTERNALS_TABLE = 'externals';
module.exports.up = async function(knex) {
    if (await knex.schema.hasTable(EXTERNALS_TABLE)) {
        return;
    }
    await knex.schema.createTable(EXTERNALS_TABLE, (table) => {
        table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
        table.string('first_name');
        table.string('middle_name').nullable();
        table.string('last_name');
        table.string('unit').nullable();
        table.string('label');
        table.boolean('deleted').defaultTo(false);
        table.timestamp('deleted_at').nullable();
        table.timestamps({
            useTimestamps: true,
            defaultToNow: true,
        });
    });
}


module.exports.down = async function(knex) {
    await knex.schema.dropTable(EXTERNALS_TABLE);
}
