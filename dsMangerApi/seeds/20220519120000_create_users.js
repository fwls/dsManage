const bcrypt = require("bcrypt")

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return Promise.all([
        // knex.schema.dropTable('posts'),npx knex migrate:make create_tables
        knex('users').del()
            .then(function () {
                // Inserts seed entries
                return knex('users').insert([
                    { username: 'admin', password: bcrypt.hashSync('123456', 10) },
                    { username: 'john_doe', password: bcrypt.hashSync('password123', 10) },
                    { username: 'jane_smith', password: bcrypt.hashSync('abc@123', 10) }
                ]);
            }),

        knex('data_sources').del()
            .then(function () {
                // Inserts seed entries
                return knex('data_sources').insert([
                    {
                        name: 'mysql1',
                        type: 'MySQL',
                        url: '127.0.0.1',
                        username: 'root',
                        password: 'root',
                        database: 'mysql',
                        ext: null,
                        port: 3306,
                        charset: 'utf8',
                    },
                    {
                        name: 'jsEngine1',
                        type: 'JavaScript',
                        url: null,
                        username: null,
                        password: null,
                        database: null,
                        ext: null,
                        port: null,
                        charset: null,
                    },
                ]);
            }),
    ]);
};