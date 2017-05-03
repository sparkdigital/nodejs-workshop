'use strict';

// Require dependencies
const express = require('express');

// Init an Express Router
const router = express.Router();

const moviesService = require('../services/movies.service.js');
const omdbService = require('../services/omdb.service.js');

// Define a middleware for all routes (*) and all methods (router.all)
router.all('*', (req, res, next) => {
  console.log('Requested ', req.method, ' on ', req.path);
  next();
});

/* GET movies listing. */
router.get('/', (req, res, next) => {
  moviesService.fetchList()
    .then(movies => res.send(movies))
    .catch(err => next(err));
});

/* SEARCH movies. */
router.get('/search', (req, res, next) => {
  omdbService.search(req.query.query, (err, movies) => {
    if (err) {
      return next(err);
    }

    res.send(movies);
  });
});

module.exports = router;
