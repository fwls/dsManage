const bcrypt = require("bcrypt")

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                { username: 'admin', password: bcrypt.hashSync('123456', 10) },
                { username: 'john_doe', password: bcrypt.hashSync('password123', 10) },
                { username: 'jane_smith', password: bcrypt.hashSync('abc@123', 10) }
            ]);
        });
};