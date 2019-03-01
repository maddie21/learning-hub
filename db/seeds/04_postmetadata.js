
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post_metadata').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('post_metadata').insert({like: 0, rating: 3 , user_id: 21, post_id: 22  }),
        knex('post_metadata').insert({like: 0, rating: 1 , user_id: 22, post_id: 22 }),
        knex('post_metadata').insert({like: 1, rating: 5 , user_id: 22, post_id: 23 }),
        knex('post_metadata').insert({like: 0 , rating: 3 , user_id: 23, post_id: 24 }),
        knex('post_metadata').insert({like: 1 , rating: 4 , user_id: 24, post_id: 25 }),
        knex('post_metadata').insert({like: 1 , rating: 2 , user_id: 21, post_id: 21 })
      ]);
    });
};

