"use strict"; 

const express = require('express');
const router  = express.Router();

var bookshelf = require('bookshelf')(knex);