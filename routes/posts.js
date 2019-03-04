"use strict";

const express = require('express')
const router  = express.Router()
const {respondFailure, respondSuccess} = require('../utility.js')

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
        .select('posts.id', 'posts.title', 'posts.description',  'posts.URL', 'posts.user_id', 'posts.create_time')
        .select(knex.raw('ROUND(AVG(post_metadata.rating),1) AS rating_average'))
        .sum('post_metadata.like as like_count')
        .distinct('posts.id')
        .groupBy('posts.id')
        .orderBy('posts.create_time', 'asc')

        return respondSuccess(res, posts)
    }
    catch (error) {
      console.error(error)
      return respondFailure(res, [
        'Error getting posts.'
      ])
    }
  });

  // Send posts of in-session user
  router.get('/mine', async (req, res) => {
    try {
      const posts = await knex('posts')
        .select('*')
        .where('user_id', req.session.userId)
      return respondSuccess(res, posts)
    } 
    
    catch (error) {
      console.error(error)
      return respondFailure(res, [
        'Error getting current user posts.'
      ])
    }
    }
  )

  // Takes a new post object and add it to the database
  router.post('/', (req, res) => {
    const {title, URL, description, category_name} = req.body
    const user_id = req.session.userId
    if (title === undefined || URL === undefined || description === undefined || category_name === undefined) {
      return respondFailure(res, [
        'Missing prameters: must give title, URL, description, category_name.'
      ])
    }

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
      
        if(post === undefined) {
        return respondFailure(res, [
          `Cannot find post with the given post id ${postId}.`
        ])
      }

      return respondSuccess(res, post)
    } 
    
    catch (exception) {
      console.log(exception)
      return respondFailure(res, [
        'Error finding post in the database.'
      ])
    }
  })
  
  // Send back all posts that this user liked
  router.get('/mine/like', async (req, res) => {
    const userId = req.session.userId

    try {
      const posts = await knex('posts')
        .leftJoin('post_metadata', 'posts.id', '=', 'post_metadata.post_id')
        .select('posts.id as post_id', 'posts.title', 'posts.description',  'posts.URL', 'posts.user_id as author_id')
        .select(knex.raw('ROUND(AVG(post_metadata.rating),1) as rating_average'))
        .count('post_metadata.like as like_count')
        .where('post_metadata.user_id', userId)
        .andWhere('post_metadata.like', 1)
        .distinct('posts.id as post_id')
        .groupBy('posts.id')

      return respondSuccess(res, posts)
    } 

    catch (exception) {
      console.log(exception)
      return respondFailure(res, [
        'Error finding liked posts of the current user.'
      ])
    }

  })

  // Flips the like that belongs to the post
  router.post('/:postId/like', async (req, res) => {
    const user_id = req.session.userId
    const post_id = Number(req.params.postId)

    if (post_id === undefined) {
      return respondFailure(res, [
        'Missing parameter: must provide post_id'
      ])
    }
    
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
        return respondSuccess(res)
      } else {
        // if no previous relation, insert new record
        await knex('post_metadata')
          .insert({
            like: 1, 
            rating: null, 
            user_id,
            post_id})
        
        return respondSuccess(res)
      }


    } catch (exception) {
      console.log(exception)
      return respondFailure(res, [
        'Error updating the database.'
      ])
    }

  })

  router.post('/:postId/rating', async (req, res) => {

    // Check valid parameters 
    const user_id = req.session.userId
    const post_id = Number(req.params.postId)
    const {rating} = req.body

    // End request if parameter missing
    if (user_id === undefined || post_id === undefined || rating === undefined) {
      return respondFailure(res, [
        'Missing parameters: user_id, post_id and rating'
      ])
    }

    try {

      // Get the post_metadata based on user and post
      const user_post_relation = await knex('post_metadata')
      .select('rating')
      .first()
      .where('user_id', '=', user_id)
      .andWhere('post_id', '=', post_id)

      if (user_post_relation) {
        // If theres is a record, update to the curent rating
        await knex('post_metadata')
        .where('user_id', '=', user_id)
        .andWhere('post_id', '=', post_id)
        .update({
          rating: rating
        })
      } else {
        // if no previous relation, insert new record
        await knex('post_metadata')
        .insert({
          like: 0, 
          rating: rating,
          user_id,
          post_id})
      }

      return respondSuccess(res)
    }
    
    catch (exception) {
      console.log(exception)
      return respondFailure(res, [
        'Error updating the database.'
      ])
    }

  })

  return router;
}
