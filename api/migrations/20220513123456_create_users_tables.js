exports.up = function(knex) {
    return Promise.all([
      knex.schema.createTable('users', function(table) {
        table.increments('id');
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.string('email');
        table.smallint('status').defaultTo(0);
        table.timestamp('deleted_at');
        table.timestamps(true, true);
      }),
  
      // knex.schema.createTable('posts', function(table) {
      //   table.increments('id');
      //   table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      //   table.string('title').notNullable();
      //   table.text('content').notNullable();
      //   table.timestamps(true, true);
      // }),
  
      // Add more table definitions as needed
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      // knex.schema.dropTable('posts'),npx knex migrate:make create_tables
      knex.schema.dropTable('users')
      // Drop other tables in reverse order
    ]);
  };