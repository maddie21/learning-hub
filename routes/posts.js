"use strict";

const express = require('express')
const router  = express.Router()
const {respondFailure, respondSuccess} = require('../utility.js')

module.exports = (knex) => {

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
        .leftJoin('post_metadata', 'posts.id', '=', 'post_metadata.post_id')
        .select('posts.id', 'posts.title', 'posts.description',  'posts.URL', 'posts.user_id')
        .select(knex.raw('ROUND(AVG(post_metadata.rating),1) as rating_average'))
        .sum('post_metadata.like as like_count')
        .where('posts.user_id', req.session.userId)
        .distinct('posts.id')
        .groupBy('posts.id')
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
    const {title, URL, description} = req.body
    const user_id = req.session.userId
    if (title === undefined || URL === undefined || description === undefined) {
      return respondFailure(res, [
        'Missing prameters: must give title, URL, description, category_name.'
      ])
    }

    knex('posts')
      .insert({title, description, URL, user_id})
      .returning('id')
      .then(() => {
        return respondSuccess(res)
      })
      .catch(err => {
        console.log(err)
        return respondFailure(res, [
          'Error inserting new post to database.'
        ])
      })

  })

  router.post('/search', (req, res) => {
    
    const {keyword} = req.body
    console.log('keyword: ', keyword)
    if (keyword === '' || keyword === undefined) {
      return respondSuccess(res, [
        'Missing parameters: must give keyword which is not an empty string.'
      ])
    }

    knex('posts')
      .leftJoin('post_metadata', 'posts.id', '=', 'post_metadata.post_id')
      .select('posts.id', 'posts.title', 'posts.description',  'posts.URL', 'posts.user_id', 'posts.create_time')
      .select(knex.raw('ROUND(AVG(post_metadata.rating),1) AS rating_average'))
      .sum('post_metadata.like as like_count')
      .distinct('posts.id')
      .groupBy('posts.id')
      .orderBy('posts.create_time', 'asc')
      .where(
        knex.raw('LOWER(posts.title) like ?', `%${keyword}%`)
      )
      .orWhere(
        knex.raw('LOWER(posts.description) like ?', `%${keyword}%`)
      )
      .then(posts => respondSuccess(res, posts))
      .catch(exception => {
        console.log(exception)
        return respondFailure(res, [
          `Error retrieving posts with keyword ${keyword}`
        ])
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
        .sum('post_metadata.like as like_count')
        .where('posts.id', postId)
        .first()
        .distinct('posts.id')
        .groupBy('posts.id')
      
      if (post === undefined) {
        return respondFailure(res, [`Cannot find post with the given post id ${postId}.`])
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
        .select('posts.id', 'posts.title', 'posts.description',  'posts.URL', 'posts.user_id')
        .select(knex.raw('ROUND(AVG(post_metadata.rating),1) as rating_average'))
        .count('post_metadata.like as like_count')
        .where('post_metadata.user_id', userId)
        .andWhere('post_metadata.like', 1)
        .distinct('posts.id')
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

  router.get('/:postId/comments', async (req, res) => {
    const post_id = Number(req.params.postId)
    try {
      const comments = await knex('comments')
        .select('content', 'create_time', 'user_id')
        .where('post_id', '=', post_id)
      
      return respondSuccess(res, comments)
    }

    catch (exception) {
      console.log(exception)
      respondFailure(res, [
        'Error retrieving comments from database'
      ])
    }
  })

  router.post('/:postId/comments', async (req, res) => {
    const post_id = Number(req.params.postId)
    const user_id = req.session.userId
    const {comment_content} = req.body

    // Check parameters
    if (post_id === undefined || user_id === undefined || comment_content === undefined) {
      return respondFailure(res, [
        'Missing parameters: must give post_id, user_id, and comment_content'
      ])
    }
    
    const newComment = {
      post_id, 
      user_id, 
      content: comment_content,
      create_time: knex.raw('CURRENT_TIMESTAMP')
    }

    knex('comments')
      .insert(newComment, '*')
      .then((newAddedComment) => {
        return respondSuccess(res, newAddedComment)
      })
      .catch (exception => {
        console.log(exception)
        return respondFailure(res, [
          'Error inserting new comment into database'
        ])
      })
  })

  router.get('/category/:categoryId', (req, res) => {
    const category_id = Number(req.params.categoryId)
    
    knex('posts')
      .leftJoin('post_metadata', 'posts.id', '=', 'post_metadata.post_id')
      .select('posts.id', 'posts.title', 'posts.description',  'posts.URL', 'posts.user_id', 'posts.create_time')
      .select(knex.raw('ROUND(AVG(post_metadata.rating),1) AS rating_average'))
      .sum('post_metadata.like as like_count')
      .distinct('posts.id')
      .groupBy('posts.id')
      .orderBy('posts.create_time', 'asc')
      .where('category_id', '=', category_id)
      .then(posts => {
        return respondSuccess(res, posts)
      })

      .catch(exception => {
        console.log(exception)
        return respondFailure(res, [
          'Error retrieving posts.'
        ])
      })
  })

  return router;
}
