module.exports = {
    client: 'better-sqlite3',
    connection: {
      filename: './db.sqlite3'
    },
    useNullAsDefault: true,
    seeds: {
      directory: './seeds'
    }
  }