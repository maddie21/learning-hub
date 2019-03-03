
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post_metadata').del()
    .then(function () {
      return Promise.all([
       // Inserts seed entries
        knex('post_metadata').insert({like: 1, rating: 3 , user_id: 1, post_id: 2  }),
        knex('post_metadata').insert({like: 0, rating: 1 , user_id: 2, post_id: 3 }),
        knex('post_metadata').insert({like: 0, rating: 2 , user_id: 1, post_id: 3 }),
        knex('post_metadata').insert({like: 0, rating: 5 , user_id: 3, post_id: 3 }),
        knex('post_metadata').insert({like: 0, rating: 1 , user_id: 4, post_id: 3 }),
        knex('post_metadata').insert({like: 1, rating: 5 , user_id: 5, post_id: 2 }),
        knex('post_metadata').insert({like: 0 , rating: 3 , user_id: 3, post_id: 5 }),
        knex('post_metadata').insert({like: 1 , rating: 4 , user_id: 4, post_id: 5 }),
        knex('post_metadata').insert({like: 1 , rating: 4 , user_id: 1, post_id: 4 }),
        knex('post_metadata').insert({like: 1 , rating: 3 , user_id: 2, post_id: 4 }),
        knex('post_metadata').insert({like: 1 , rating: 0 , user_id: 3, post_id: 4 }),
        knex('post_metadata').insert({like: 1 , rating: 4 , user_id: 1, post_id: 5 }),
        knex('post_metadata').insert({like: 1 , rating: 2 , user_id: 2, post_id: 5 }),
      ]);
    });
};

