exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, username: 'alice12', password: '123', first_name: 'Alice', last_name: `O'C`}),
        knex('users').insert({id: 2, username: 'bob13', password: '234', first_name:'Bob', last_name: 'Wilson'}),
        knex('users').insert({id: 3, username: 'mrCharlie14', password: '7687', first_name: 'Charlie', last_name:'Tylor'}),
        knex('users').insert({id: 4, username: 'X666', password: '7687', first_name: 'Willy', last_name:'Wonka'}),
        knex('users').insert({id: 5, username: 'Maddie', password: '7687', first_name: 'Maddie', last_name:'Chan'})
      ]);
    });
};
