"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  const samplePosts = [
    {
      'title': 'It’s Time for Digital Products to Start Empowering Us',
      'description': 'We’re accepting utility in exchange for disempowerment. It’s not a fair trade.',
      'externalURL': 'https://medium.com/s/user-friendly/the-future-of-digital-product-design-is-about-human-empowerment-6a025bc330a',
      'createdDate': '25-02-2019'
    },
    {
      'title': 'This Is Silicon Valley',
      'description': 'am privileged to live in Silicon Valley. I was born here, I grew up here, and now I work here as a product manager at Google. The weather is lovely, the crime rate is low, and the schools are well funded. The adults have cushy jobs and the kids have endless resources. People feast on $15 sushirritos and $6 Blue Bottle coffees.',
      'externalURL': 'https://medium.com/s/user-friendly/the-future-of-digital-product-design-is-about-human-empowerment-6a025bc330a',
      'createdDate': '25-02-2019'
    }
  ]

  router.get("/", (req, res) => {
    // knex
    //   .select("*")
    //   .from("posts")
    //   .then((results) => {
    //     res.json(results);
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    //   ;
    res.json(samplePosts)
  });


  // Takes a new post object and add it to the database
  router.post('/', (req, res) => {
  
    knex('posts')
      .insert(samplePosts)
      .then(r => {
        res.send(r)
      })
  })

  return router;
}
