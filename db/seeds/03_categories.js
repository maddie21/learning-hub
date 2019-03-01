
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('categories').insert({category_name: 'Design'}),
        knex('categories').insert({category_name: 'Sports'}),
        knex('categories').insert({category_name: 'Technology'}),
        knex('categories').insert({category_name: 'Music'}),
        knex('categories').insert({category_name: 'Politics'})
      ]);
    });
};
