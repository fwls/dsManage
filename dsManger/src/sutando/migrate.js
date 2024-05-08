const sutando = require("../config/database");

const Schema = sutando.connection().schema;

const init = {
  up: async () => {
    await Schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username");
      table.string("password");
      table.string("name");
      table.string("email");
      table.timestamps();
    });
  },
  down: async () => {
    await Schema.dropTableIfExists("users");
  },
};

const main = async () => {
  if (process.argv[2] === "rollback") {
    await init.down();
  } else {
    console.log("Creating tables...");
    await init.up();
  }

  sutando.connection().destroy();
};

main();
