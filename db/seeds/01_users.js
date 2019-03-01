exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({username: 'Alice12', password: '123', first_name: 'Alice', last_name: 'OC'}),
        knex('users').insert({username: 'Bob13', password: '234', first_name:'Bob', last_name: 's'}),
        knex('users').insert({username: 'Charlie14', password: '7687', first_name: 'Charlie', last_name:'a'}),
        knex('users').insert({username: 'X666', password: '7687', first_name: 'X', last_name:'Wang'}),
        knex('users').insert({username: 'Maddie', password: '7687', first_name: 'Maddie', last_name:'Wang'})
      ]);
    });
};

