
const ADMIN_TABLE = 'administrators';


module.exports.up = async function (knex){

    await knex.schema.createTable(ADMIN_TABLE, (table) => {
        table.uuid('id', {primaryKey: true}).defaultTo(knex.fn.uuid());
        table.uuid('user_id');
        table.string('pin');
        table.boolean('deleted').defaultTo(false);
        table.timestamp('deleted_at').nullable();
        table.timestamps({
            useTimestamps: true,
            defaultToNow: true,
        });
    });
}


module.exports.down = async function(knex){
    await knex.schema.dropTable(ADMIN_TABLE);
}

