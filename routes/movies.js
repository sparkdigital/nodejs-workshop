'use strict';

// Require dependencies
const express = require('express');

// Init an Express Router
const router = express.Router();

const moviesService = require('../services/movies.service.js');
const omdbService = require('../services/omdb.service.js');

// Define a middleware for all routes (*) and all methods (router.all)
router.all('*', (req, res, next) => {
  console.log('Requested ', req.method, ' on ', req.originalUrl);
  next();
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

/* GET movies listing. */
router.get('/', (req, res, next) => {
  moviesService.fetchList()
    .then(movies => res.send(movies))
    .catch(next);
});

/* POST new movie. */
router.post('/', (req, res, next) => {
  moviesService.saveNew(req.body)
    .then(movie => res.send(movie))
    .catch(err => res.status(400).send(err));
});

/* GET a single movie. */
router.get('/:imdbId', (req, res, next) => {
  moviesService.getMovie(req.params.imdbId)
    .then(movie => res.send(movie))
    .catch(next);
});

/* PUT an updated movie. */
router.put('/:imdbId', (req, res, next) => {
  moviesService.update(req.params.imdbId, req.body)
    .then(movie => res.send(movie))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
