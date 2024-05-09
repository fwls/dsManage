/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.all([
      knex.schema.createTable('data_sources', function(table) {
        table.increments('id');
        table.string('name').notNullable().unique();
        table.string('type', 32).notNullable();
        table.string('url', 128);
        table.string('port', 6).comment("端口");
        table.string('username');
        table.string('password');
        table.string('database').comment("数据库名");
        table.smallint('conn_status').defaultTo(0);
        table.json('ext').comment("扩展字段");
        table.timestamps(true, true);
      }),
      // 添加其他表的定义
    ]);
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return Promise.all([
      knex.schema.dropTable('data_sources'),
      // 添加其他表的回滚操作
    ]);
  };
