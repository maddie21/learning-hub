
//applying migration
exports.up = function(knex, Promise) {

    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('username');
        table.string('password');
        table.string('first_name');
        table.string('last_name');
    });
  
};

//rolling back migration 
exports.down = function(knex, Promise) {
 return knew.schema.drop('users');
};
