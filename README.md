# RESOURCE WALL Project

Resource Wall is a simple, single-page web application. Pinterest for learners.

Allows learners to save learning resources like tutorials, blogs and videos in a central place that is publicly available to any user.

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: git remote rm origin
4. Add a remote for your origin: git remote add origin <your github repo URL>
5. Push to the new origin: git push -u origin master
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started
1. Create the .env by using .env.example as a reference: cp .env.example .env
2. Update the .env file with your correct local information
3. Install dependencies: npm i
4. Fix to binaries for sass: npm rebuild node-sass
5. Run migrations: npm run knex migrate:latest
   Check the migrations folder to see what gets created in the DB
6. Run the seed: npm run knex seed:run
   Check the seeds file to see what gets seeded in the DB
7. Run the server: npm run local
8. Visit http://localhost:8080/

## Final Product 

!["Screenshot of My Resources Page"](https://github.com/xwang1000/learning-hub/blob/frontend/docs/ResourceWall-MyResources.png?raw=true)
!["Screenshot of Search results"](https://github.com/xwang1000/learning-hub/blob/frontend/docs/ResourceWall-search.png?raw=true)
!["Screenshot of My Posts"](https://github.com/xwang1000/learning-hub/blob/frontend/docs/ResourceWall-myposts.png?raw=true)
!["Screenshot of others' posts"](https://github.com/xwang1000/learning-hub/blob/frontend/docs/ResourceWall-othersposts.png?raw=true)
!["Screenshot of comments section"](https://github.com/xwang1000/learning-hub/blob/frontend/docs/Resourcewall-comments.png?raw=true)



## Dependencies 
- Node 5.10.x or above
- NPM 3.8.x or above
- body-parser 1.15.2 or above
- cookie-session 1.3.3 or above
- bookshelf 0.14.2 or above
- dotenv 2.0.0 or above
- ejs 2.4.1 or above
- express 4.13.4 or above
- knex 0.16.3 or above
- knex-logger 0.1.0 or above
- morgan 1.7.0 or above
- node-sass-middleware 0.9.8 or above
- pg 6.4.2 or above
