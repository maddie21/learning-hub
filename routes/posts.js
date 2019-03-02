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

  const getCategoryId = (category_name, cb) => {
    knex('categories')
      .select('id')
      .where('category_name', category_name)
      .first()
      .then(row => {
        console.log('row.id:', row.id)
        cb(row.id)
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
        res.json(posts)
      })
  })

  // Takes a new post object and add it to the database
  router.post('/', (req, res) => {
    const {title, URL, description, category_name} = req.body
    const user_id = req.session.userId
    getCategoryId(category_name, (categories_id) => {
      knex('posts')
        .insert({title, description, URL, user_id})
        .returning('id')
        .then((post_id) => {
          // Use the {category_id, post_id} to insert to post_categories table
          knex('post_categories')
            .insert({post_id: Number(post_id), categories_id})
            .then(() => {
              res.redirect('/api/posts')
            })
        })
        .catch(err => {
          console.log(err)
        })
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
