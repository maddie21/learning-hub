

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts')
        .insert({
                title: 'How to Paint with Alcohol Ink', 
                description: 'Linda Crocco shows us her method for creating beautiful blown flowers using alcohol ink and canned air.', 
                URL: 'https://www.youtube.com/watch?v=S9qV5hEUwjI',
                user_id: 1,
                category_id: 1
        }),

        knex('posts') 
        .insert({
                title: 'Advice on hiring and retaining designers', 
                description: 'Based in Austin, Texas, Tilted Chair, is an advertising, branding and marketing agency focused on helping brands be more human.', 
                URL: 'https://dribbble.com/stories/2019/03/01/advice-on-hiring-and-retaining-the-right-designers-for-your-agency',
                user_id: 2,
                category_id: 1
        }),

        knex('posts')
        .insert({
                title: '9 Collage artists to follow on Dribbble', 
                description: 'A collage is a form of art in which various materials are assembled together to create one piece of work.', 
                URL: 'https://dribbble.com/stories/2019/02/26/9-collage-artists-to-follow-on-dribbble',
                user_id: 2,
                category_id: 1
        }),

        knex('posts')
        .insert({
                title: 'What are Design Systems?', 
                description: 'The field of Design is ever-evolving which means the way designers work continues to change.', 
                URL: 'https://dribbble.com/stories/2019/02/22/what-are-design-systems',
                user_id: 3,
                category_id: 1
        }),

        knex('posts')
        .insert({
                title: 'Building a cohesive remote design culture', 
                description: 'In interviews, I’m often asked how I would describe our remote culture — perhaps surprisingly, cohesive is the word that comes to mind.', 
                URL: 'https://dribbble.com/stories/2019/02/19/building-a-cohesive-remote-culture',
                user_id: 2,
                category_id: 1
        }),

        knex('posts')
        .insert({
                title: 'Samsung Fold Phone', 
                description: 'Samsung Galaxy Fold is an upcoming Android hybrid smartphone developed by Samsung Electronics. Unveiled February 21, 2019, it will first be released in the United States on April 26, 2019, and in Europe on May 3, 2019. ', 
                URL: 'https://www.youtube.com/watch?v=kK2W7ErTF3g',
                user_id: 2,
                category_id: 2
        }),

        knex('posts')
        .insert({
                title: 'SpaceX Crew Dragon Docks With International Space Station', 
                description: 'SpaceX’s Crew Dragon unmanned craft successfully docked with the International Space Station on Sunday, a key milestone for chief executive officer Elon Musk, his team and the American space agency.', 
                URL: 'https://www.bloomberg.com/news/articles/2019-03-03/spacex-crew-dragon-docks-with-international-space-station',
                user_id: 2,
                category_id: 2
        }),

        knex('posts')
        .insert({
                title: 'Sensible Software Engineering', 
                description: 'This is mostly advice I wish someone had given me when I was starting out. It probably won’t make much sense until you have dealt with enough code to be sick of it. The usual disclaimers about ranting, warranties, and being a charitable audience stand.', 
                URL: 'https://www.scriptcrafty.com/2019/02/sensible-software-engineering/',
                user_id: 1,
                category_id: 2
        }),

        knex('posts')
        .insert({
                title: 'Google reveals "high severity" flaw in macOS kernell 2019', 
                description: `Google's Project Zero team is well-known for its knack of finding security flaws in the company's own products as well as those manufactured by other firms.`, 
                URL: 'https://www.neowin.net/news/google-reveals-high-severity-flaw-in-macos-kernel/',
                create_time:  knex.raw('CURRENT_TIMESTAMP'),
                user_id: 2,
                category_id: 2
        }),

        knex('posts')
        .insert({
                title: 'Superbowl 2019', 
                description: 'Super Bowl LIII was an American football game between the three-time defending American Football Conference (AFC) champions New England Patriots and the National Football Conference (NFC) champion Los Angeles Rams', 
                URL: 'https://en.wikipedia.org/wiki/Super_Bowl_LIII',
                create_time:  knex.raw('CURRENT_TIMESTAMP'),
                user_id: 2,
                category_id: 5
        }),

        knex('posts')
        .insert({
                title: 'NY Fashion Week', 
                description: 'Palo santo keffiyeh tilde', 
                URL: 'http://nyfw.com/',
                create_time:  knex.raw('CURRENT_TIMESTAMP'),
                user_id: 3
        }),

        knex('posts')
        .insert({
                title: 'House Judiciary to request documents from Trump Jr', 
                description: `The House Judiciary Committee will request documents on Monday from President Donald Trump's oldest son, his business and more than 60 individuals in his administration, the panel's chair said Sunday.`, 
                URL: 'https://www.cnn.com/2019/03/03/politics/house-judiciary-trump-investigation-obstruction-of-justice/index.html',
                create_time:  knex.raw('CURRENT_TIMESTAMP'),
                user_id: 2,
                category_id: 4
        }),

        knex('posts')
        .insert({
                title: 'House Oversight Committee issues ultimatum to White House', 
                description: `The chairman of the House Oversight Committee issued a stark warning Friday to White House counsel Pat Cipollone, demanding that the White House turn over documents and comply with interviews related to how the White House handled security clearances of some of the President's closest advisers.`, 
                URL: 'https://www.cnn.com/2019/03/01/politics/congress-investigate-security-clearances/index.html',
                create_time:  knex.raw('CURRENT_TIMESTAMP'),
                user_id: 2,
                category_id: 4
        }),

        knex('posts')
        .insert({
                title: 'Camila Cabello Shares the 22 Most Important Life Lessons', 
                description: 'The "Havana" singer turned 22 on Sunday and imparted some of her biggest life lessons onto her 31 million Instagram followers. She typed up two pages of notes and tackled a variety of topics—from falling in love and family to the importance of taking bubble baths and reading.', 
                URL: 'https://www.eonline.com/ca/news/1020334/camila-cabello-shares-the-22-most-important-lessons-she-learned-when-she-was-21',
                create_time:  knex.raw('CURRENT_TIMESTAMP'),
                user_id: 2,
                category_id: 3
        }),

        knex('posts')
        .insert({
                title: 'What it’s like to be Kanye West’s hair guru', 
                description: `Over the past few months, Kanye West has debuted a series of radical, colorful hairstyles at the hands of HAIR Salon owner Daniel Moon, from a vibrant pink dye job to his current rainbow tie-dyed ‘do.`,
                URL: 'https://pagesix.com/2019/03/01/what-its-like-to-be-kanye-wests-hair-guru/',
                create_time:  knex.raw('CURRENT_TIMESTAMP'),
                user_id: 1,
                category_id: 3
        })
      ]);
    });
};


