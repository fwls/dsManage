/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('data_channel_data_sets', function (table) {
            table.increments('id');
            table.string('name', 64).notNullable().unique();
            table.integer('push_type', 12).comment('推送方式').defaultTo('http');
            table.integer('push_cron', 128).comment('推送间隔').defaultTo('* * * * *');
            table.integer('data_channel_id').unsigned().notNullable().references('id').inTable('data_channels').onDelete('cascade');
            table.integer('data_set_id').unsigned().notNullable().references('id').inTable('data_sets').onDelete('cascade');
            table.smallint('status').defaultTo(0);
            table.timestamp('deleted_at');
            table.integer('user_id').defaultTo(0).comment("创建人");
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
