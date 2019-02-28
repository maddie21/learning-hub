//applying migration
exports.up = function(knex, Promise) {
    return createPostTable()
        .then(createUsersTable)
        .catch(err => console.log(err));

    function createPostTable () {
        return knex.schema.createTable('posts', (table) => {
            table.increments().primary();
            table.string('title', 20);
            table.string('description', 800);
            table.string('URL');
            table.date('create_time');
        })
    }

    function createUsersTable () {
        return knex.schema.createTable('users', (table) => {
            table.increments().primary();
            table.string('username');
            table.string('password');
            table.string('first_name');
            table.string('last_name');
        })
    }

  };

//rolling back migration 
exports.down = function(knex, Promise) {
 return knex.schema.dropTable('users')
 .then(knex.schema.dropTable('posts'));
        
};
