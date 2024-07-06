const ATTENDANCE_TABLE = 'attendance';


module.exports.up = async function (knex) {
    if (await knex.schema.hasTable(ATTENDANCE_TABLE)) {
        return;
    }
    await knex.schema.createTable(ATTENDANCE_TABLE, (table) => {
        table.uuid('id', {primaryKey: true}).defaultTo(knex.fn.uuid());
        table.uuid('user_id');
        table.string('user_type');
        table.uuid('duty_post').nullable();
        table.timestamp('time_in');
        table.timestamp('time_out').nullable();
        table.string('status');
        table.boolean('deleted').defaultTo(false);
        table.timestamp('deleted_at').nullable();
        table.timestamps({
            useTimestamps: true,
            defaultToNow: true,
        });
    });
}


module.exports.down = async function (knex) {
    await knex.schema.dropTable(ATTENDANCE_TABLE)
}
