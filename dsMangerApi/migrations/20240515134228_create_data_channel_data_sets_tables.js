/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('data_channel_data_sets', function (table) {
            table.increments('id');
            table.string('name').notNullable().unique();
            table.smallint('type').comment('推送方式').defaultTo(0);
            table.integer('data_channel_id').unsigned().notNullable().references('id').inTable('data_channels').onDelete('cascade');
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
        knex.schema.dropTable('data_channel_data_sets')
    ])
};
