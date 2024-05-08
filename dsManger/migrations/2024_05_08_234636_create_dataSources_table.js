const { Migration, sutando } = require("sutando");

module.exports = class extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema) {
    await schema.createTable("dataSources", (table) => {
      table.increments("id").primary();
      table.string("name").unique();
      table.string("type", 100);
      table.string("url");
      table.string("username");
      table.string("password");
      table.smallint("status");
      table.json("ext");
      table.timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("dataSources");
  }
};
