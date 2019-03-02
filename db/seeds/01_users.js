exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, username: 'Alice12', password: '123', first_name: 'Alice', last_name: 'OC'}),
        knex('users').insert({id: 2, username: 'Bob13', password: '234', first_name:'Bob', last_name: 's'}),
        knex('users').insert({id: 3, username: 'Charlie14', password: '7687', first_name: 'Charlie', last_name:'a'}),
        knex('users').insert({id: 4, username: 'X666', password: '7687', first_name: 'X', last_name:'Wang'}),
        knex('users').insert({id: 5, username: 'Maddie', password: '7687', first_name: 'Maddie', last_name:'Wang'})
      ]);
    });
};
