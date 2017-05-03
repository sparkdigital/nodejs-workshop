'use strict';

const mongoose = require('mongoose');

const Movie = mongoose.model('Movie',{
  imdbId: {
    type: String,
    required: true,
    unique: true
  },
  Title: String,
  Year: Number,
  Director: String,
  Poster: String
});

module.exports = Movie;
