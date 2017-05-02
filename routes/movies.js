// Require plain JSON object
const mockedMoviesList = require('../data/mockedMoviesList.js');

// Require dependencies
const express = require('express');

// Init an Express Router
const router = express.Router();

// Define a middleware for all routes (*) and all methods (router.all)
router.all('*', (req, res, next) => {
  console.log('Requested ', req.method, ' on ', req.path);
  next();
});

/* GET movies listing. */
router.get('/', (req, res, next) => {
  res.send(mockedMoviesList);
});

module.exports = router;
