const { Migration, sutando } = require('sutando');

module.exports = class extends Migration {
  /**
    * Run the migrations.
    */
  async up(schema) {
    await schema.createTable('users', (table) => {
      table.increments("id").primary();
      table.string("username").nullable().unique();
      table.string("password").nullable();
      table.string("name");
      table.string("email");
      table.timestamps();
    });
  }

  /**
    * Reverse the migrations.
    */
  async down(schema) {
    await schema.dropTableIfExists('users');
  }
};