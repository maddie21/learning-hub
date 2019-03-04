
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({content: 'Wow, this is so cool!' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 1 , user_id: 1 }),
        knex('comments').insert({content: 'Thanks for sharing this knowledge :)' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 1 , user_id: 3 }),
        knex('comments').insert({content: 'Actually, I have an opposite theory...' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 1 , user_id: 4 }),
        knex('comments').insert({content: 'Cool stuff man.' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 2 , user_id: 2 }),
        knex('comments').insert({content: 'Really cool video!' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 2 , user_id: 3 }),
        knex('comments').insert({content: '2019 and still reading this.' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 3 , user_id: 2 }),
        knex('comments').insert({content: 'I wonder that too!' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 3 , user_id: 4 }),
      ]);
    });
};
