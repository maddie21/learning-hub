"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

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

  return router;
}
