//applying migration
exports.up = function(knex, Promise) {
    // return knex.schema.createTable('users', (table) => {
    //     table.increments();
    //     table.string('username');
    //     table.string('password');
    //     table.string('first_name');
    //     table.string('last_name');
    //   }).then(createPostTable)
    return createPostTable()
        .then(createUsersTable)
        .catch(err => console.log(err));

    function createPostTable () {
        return knex.schema.createTable('posts', (table) => {
            table.increments();
            table.string('title');
            table.string('description');
            table.date('create_time');
        })
    }

    function createUsersTable () {
        return knex.schema.createTable('users', (table) => {
            table.increments();
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
