const env = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[env]);

const newUser = {
   username: "Flakiness",
   password: "12345",
   first_name: "Patrick",
   last_name: "O C"
};

knex('users').insert(newUser, '*'); 