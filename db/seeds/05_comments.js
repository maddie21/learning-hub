
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({id: 1, content: 'Here is a comment!! 12345 ' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 1 , user_id: 1 }),
        knex('comments').insert({id: 2, content: ':) :) :) !! odvhf ' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 1 , user_id: 3 }),
        knex('comments').insert({id: 3, content: 'Comment! oidvhjsodi ' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 1 , user_id: 4 }),
        knex('comments').insert({id: 4, content: 'Here is a comment!! eoijfoiw ' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 2 , user_id: 2 }),
        knex('comments').insert({id: 5, content: 'comment!! 12345 ' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 2 , user_id: 3 }),
        knex('comments').insert({id: 6, content: 'anothercomment!! 12345 ' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 3 , user_id: 2 }),
        knex('comments').insert({id: 7, content: 'ANOTHER omment!! iodhfowhf ' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 3 , user_id: 4 }),
      ]);
    });
};
