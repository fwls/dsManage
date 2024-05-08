// Update with your config settings.

module.exports = {
  // client: 'mysql2',
  // connection: {
  //   host: 'localhost',
  //   database: 'database',
  //   user:     'user',
  //   password: 'password'
  // },
  client: "sqlite3",
  connection: {
    filename: "./example.db",
  },
  migrations: {
    table: 'migrations',
    path: './migrations',
  },
  models: {
    path: './src/models'
  }
};
