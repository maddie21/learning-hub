
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts')
        .insert({title: 'Post A', 
                description: 'Palo santo keffiyeh tilde skateboard butcher street art fashion axe. Everyday carry humblebrag iceland XOXO neutra, sriracha la croix. ', 
                URL: 'http://www.facebook.com' }),

        knex('posts')
        .insert({title: 'Post B', 
                description: 'Palo santo keffiyeh tilde skateboard butcher street art fashion axe. Everyday carry humblebrag iceland XOXO neutra, sriracha la croix. ', 
                URL: 'http://www.twitter.com' }),

        knex('posts')
        .insert({title: 'Post C', 
                description: 'Palo santo keffiyeh tilde skateboard butcher street art fashion axe. Everyday carry humblebrag iceland XOXO neutra, sriracha la croix. ', 
                URL: 'http://www.instagram.com' }),

        knex('posts')
        .insert({title: 'Post D', 
                description: 'Palo santo keffiyeh tilde', 
                URL: 'http://www.Twitter.com',
                create_time:  knex.raw('CURRENT_TIMESTAMP') }),
      ]);
    });
};


