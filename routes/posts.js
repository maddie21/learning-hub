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

  // Send posts of in-session user
  router.get('/mine', (req, res) => {
    knex('posts')
      .select('*')
      .where('user_id', req.session.userId)
      .then(posts => {
        console.log(posts)
        res.json(posts)
      })
  })

  // Takes a new post object and add it to the database
  router.post('/', (req, res) => {
    const {title, URL, description, category_name} = req.body
    const user_id = req.session.userId

    knex('posts')
      .insert({title, description, URL, user_id})
      .then(() => {
        // Create a new category (if not already exist)
        knex('categories')
          .insert({category_name})
          .then(() => {
            res.redirect('/api/posts')
          })
        })
      .catch(err => {
        console.log(err)
      })
    
    

    // Use the {category_id, post_id, user_id} to insert to post_categories table

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
