"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  const getCategoryId = (category_name, cb) => {
    knex('categories')
      .select('id')
      .where('category_name', category_name)
      .first()
      .then(row => {
        cb(row.id)
      })
  }

  router.get("/", async (req, res) => {

    try {
      const posts = await knex('posts')
      .leftJoin('post_metadata', 'posts.id', '=', 'post_metadata.post_id')
      .select('posts.id', 'posts.title', 'posts.description',  'posts.URL', 'posts.user_id')
      .select(knex.raw('ROUND(AVG(post_metadata.rating),1) AS rating_average'))
      .count('post_metadata.like as like_count')
      .distinct('posts.id')
      .groupBy('posts.id')
      res.send(posts)
    }
    catch (error) {
      console.log(error)
      res.end('Something went wrong')
    }
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
  router.get('/:postId', async (req, res) => {
    const {postId} = req.params
    try {
      const post = await knex('posts')
        .leftJoin('post_metadata', 'posts.id', '=', 'post_metadata.post_id')
        .select('posts.id', 'posts.title', 'posts.description',  'posts.URL', 'posts.user_id')
        .select(knex.raw('ROUND(AVG(post_metadata.rating),1) as rating_average'))
        .count('post_metadata.like as like_count')
        .where('posts.id', postId)
        .first()
        .distinct('posts.id')
        .groupBy('posts.id')
      res.send(post)
    } catch (error) {
      console.log(error)
    }
  })
  
  // Send back all posts that this user liked
  router.get('/mine/like', (req, res) => {
    const {userId} = req.params

  })

  // Flips the like that belongs to the post
  router.post('/:postId/like', async (req, res) => {
    const user_id = req.session.userId
    const post_id = Number(req.params.postId)
    
    try {
      // Get the post_metadata based on user and post
      const user_post_relation = await knex('post_metadata')
      .select('like')
      .first()
      .where('user_id', '=', user_id)
      .andWhere('post_id', '=', post_id)

      if (user_post_relation) {
        // If theres is a record, update and flip the like
        const newLike = user_post_relation.like === 1 ? 0 : 1
        await knex('post_metadata')
        .where('user_id', '=', user_id)
        .andWhere('post_id', '=', post_id)
        .update({
          like: newLike
        })
      } else {
        // if no previous relation, insert new record
        await knex('post_metadata')
        .insert({
          like: 1, 
          rating: 0, 
          user_id,
          post_id})
      }

    } catch (error) {
      console.log(error)
    }

  })

  router.post('/:postId/rating', async (req, res) => {
    const user_id = req.session.userId
    const post_id = Number(req.params.postId)
    const ratingSubmitted = Number(req.body.rating)
    
    try {
      // Get the post_metadata based on user and post
      const user_post_relation = await knex('post_metadata')
      .select('rating')
      .first()
      .where('user_id', '=', user_id)
      .andWhere('post_id', '=', post_id)

      if (user_post_relation) {
        // If theres is a record, update to the curent rating
        const newLike = user_post_relation.like === 1 ? 0 : 1
        await knex('post_metadata')
        .where('user_id', '=', user_id)
        .andWhere('post_id', '=', post_id)
        .update({
          rating: ratingSubmitted
        })
      } else {
        // if no previous relation, insert new record
        await knex('post_metadata')
        .insert({
          like: 1, 
          rating: 0, 
          user_id,
          post_id})
      }

    } catch (error) {
      console.log(error)
    }


  })

  return router;
}
