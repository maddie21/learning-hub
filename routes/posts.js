"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  const getMetadataById = (postId) => {
    knex.select('*')
      .from('post_metadata')
      .where('user_id', postId)
      .then(metadatas => {
        forEach(metadata => {
          console.log(metadata)
        })
      })
  }

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("posts")
      .where('id', 1)
      .then(posts => {
        // posts.forEach(post => {
        //   getMetadataById(post.id)
        // })
        res.json(posts);
      })
      .catch(err => {
        console.log(err)
      });

  });

  // Takes a new post object and add it to the database
  router.post('/', (req, res) => {
    const {title, URL, description} = req.body
    knex('posts')
      .insert({title,description,URL})
      .then(r => {
        res.redirect('/api/posts')
      })
      .catch(err => {
        console.log(err)
      })
  })

  // Takes a post id and returns the post record and its metadata
  router.get('/:postId', (req, res) => {
    const {postId} = req.params
    knex('posts')
      .select('*')
      .where('id', postId)
      .then(post => {
        res.json(post)
      })
  })

  return router;
}
