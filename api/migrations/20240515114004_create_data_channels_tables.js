/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('data_channels', function (table) {
            table.increments('id');
            table.string('name').notNullable().unique();
            table.string('remark');
            table.smallint('status').defaultTo(0);
            table.timestamp('deleted_at');
            table.timestamps(true, true);
        })
    ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('data_channels')
    ])
};
