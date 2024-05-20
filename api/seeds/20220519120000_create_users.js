const bcrypt = require("bcrypt");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return Promise.all([
    // knex.schema.dropTable('posts'),npx knex migrate:make create_tables
    knex("users")
      .del()
      .then(function () {
        // Inserts seed entries
        return knex("users").insert([
          { username: "admin", password: bcrypt.hashSync("123456", 10) },
          {
            username: "john_doe",
            password: bcrypt.hashSync("password123", 10),
          },
          { username: "jane_smith", password: bcrypt.hashSync("abc@123", 10) },
        ]);
      }),

    knex("data_sources")
      .del()
      .then(function () {
        // Inserts seed entries
        return knex("data_sources").insert([
          {
            id: 1,
            name: "mysql1",
            type: "mysql",
            url: "127.0.0.1",
            username: "root",
            password: "root",
            database: "mysql",
            ext: null,
            port: 3306,
            charset: "utf8",
            status: 1,
          },
          {
            id: 2,
            name: "jsEngine1",
            type: "javascript",
            url: null,
            username: null,
            password: null,
            database: null,
            ext: null,
            port: null,
            charset: null,
            status: 1,
            conn_status: 1,
          },
        ]);
      }),
    knex("data_sets")
      .del()
      .then(function () {
        // Inserts seed entries
        return knex("data_sets").insert([
          {
            id: 1,
            name: "mysql1",
            data_source_id: 1,
            content: `SELECT now()`,
            status: 1,
          },
          {
            id: 2,
            name: "jsEngine1",
            data_source_id: 2,
            status: 1,
            content: `function main(){
                return {
                    value: "ok1"
                }
            }
            
            main()`
          },
        ]);
      }),
      knex("data_channels")
      .del()
      .then(function () {
        // Inserts seed entries
        return knex("data_channels").insert([
          {
            id: 1,
            name: "测试频道",
            remark: `SELECT now()`,
            status: 1,
          },
          {
            id: 2,
            name: "jsEngine1",
            remark: 2,
            status: 1,
          },
        ]);
      }),
  ]);
};
