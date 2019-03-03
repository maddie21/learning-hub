
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({id: 1, content: 'Wow, this is so cool!' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 1 , user_id: 1 }),
        knex('comments').insert({id: 2, content: 'Yummmmy! :)' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 1 , user_id: 3 }),
        knex('comments').insert({id: 3, content: 'Mmmmmm! these look good' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 1 , user_id: 4 }),
        knex('comments').insert({id: 4, content: 'Wow! interesting read :)' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 2 , user_id: 2 }),
        knex('comments').insert({id: 5, content: 'Really cool video!' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 2 , user_id: 3 }),
        knex('comments').insert({id: 6, content: 'I am going to make this :)' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 3 , user_id: 2 }),
        knex('comments').insert({id: 7, content: 'Yum yum :)' , create_time: knex.raw('CURRENT_TIMESTAMP') , post_id: 3 , user_id: 4 }),
      ]);
    });
};
