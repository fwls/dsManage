const { sutando } = require("sutando");

sutando.addConnection({
  client: "sqlite3",
  connection: {
    filename: "./example.db",
  },
  useNullAsDefault: true,
});



module.exports = sutando