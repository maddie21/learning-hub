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
        cb(row.id)
      })
  }

  // returns a post object contains {title, description, url, category_name}
  const getPostWithMegaData = (post, cb) => {
    knex('post_categories')
      .select('categories_id')
      .where('post_id', 6)
      .first()
      .then(row => {
        knex('categories')
          .select('category_name')
          .where('id', row.categories_id)
          .first()
          .then(row => {
            cb(row.category_name)
          })
      })
  }

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("posts")
      .then(posts => {
        // res.send(posts.reduce((postsWithMegaData, post) => {
          // getPostWithMegaData(post, category_name => {
          //   [...postsWithMegaData, {...post, category_name}]            
          // })

        //   [ ...postsWithMegaData, {...post, category_name: 'Technology'} ]    
        // }, []))
        // posts.forEach(post => {
        //   getMetadataById(post.id)
        // })
        // res.send(posts);
        // let postsWithMeta = []
        
        // posts.forEach(post => {
        //   getPostWithMegaData(post, category_name => {
        //     // console.log('currentPost: ', {...post, category_name})
        //     postsWithMeta.push({...post, category_name})
        //   })
        //   console.log('postsWithMeta: ', postsWithMeta.length)
        // })
        // console.log('postsWithMeta: ', postsWithMeta)


        res.send(posts)
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
