"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  // Takes a new post object and add it to the database
  router.post('/', (req, res) => {
    const {username, password, first_name, last_name} = req.body
    
    knex('users')
      .insert({username, password, first_name, last_name})
      .then(r => res.redirect('/api/users'))
      .catch(err => {
        console.log(err)
      })
  });


  return router;
}
