
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts')
        .insert({
                title: 'Pancakes', 
                description: 'yumm', 
                URL: 'https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/' }),

        knex('posts')
        .insert({
                title: 'Samsung Fold Phone', 
                description: 'Samsung Galaxy Fold is an upcoming Android hybrid smartphone developed by Samsung Electronics. Unveiled February 21, 2019, it will first be released in the United States on April 26, 2019, and in Europe on May 3, 2019. ', 
                URL: 'https://www.youtube.com/watch?v=kK2W7ErTF3g'
        }),

        knex('posts')
        .insert({
                title: 'Chocolate Fudge Cake', 
                description: 'For the true chocolate lover, this cake is moist and dense and you are going to love it. Great with cream cheese frosting or cooked fudge frosting.', 
                URL: 'https://www.allrecipes.com/recipe/7374/fudge-cake/' 
        }),

        knex('posts')
        .insert({
                title: 'Superbowl 2019', 
                description: 'Super Bowl LIII was an American football game between the three-time defending American Football Conference (AFC) champions New England Patriots and the National Football Conference (NFC) champion Los Angeles Rams', 
                URL: 'https://en.wikipedia.org/wiki/Super_Bowl_LIII',
                create_time:  knex.raw('CURRENT_TIMESTAMP')
        }),

        knex('posts')
        .insert({
                title: 'NY Fashion Week', 
                description: 'Palo santo keffiyeh tilde', 
                URL: 'http://nyfw.com/',
                create_time:  knex.raw('CURRENT_TIMESTAMP')
        })
      ]);
    });
};


