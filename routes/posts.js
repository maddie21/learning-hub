"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  const samplePost = {
    'title': 'It’s Time for Digital Products to Start Empowering Us',
    'description': 'We’re accepting utility in exchange for disempowerment. It’s not a fair trade.',
    'URL': 'https://medium.com/s/user-friendly/the-future-of-digital-product-design-is-about-human-empowerment-6a025bc330a'
  }

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("posts")
      .then((results) => {
        res.json(results);
      })
      .catch(err => {
        console.log(err)
      })
      ;
  });


  // Takes a new post object and add it to the database
  router.post('/', (req, res) => {
  
    knex('posts')
      .insert({
        title: 'Post K', 
        description: 'alo santo keffiyeh tilde skateboard butcher street art fashion axe.', 
        URL: 'www.666.com'
      })
      .then(r => res.redirect('/api/posts'))
      .catch(err => {
        console.log(err)
      })
  })

  return router;
}
