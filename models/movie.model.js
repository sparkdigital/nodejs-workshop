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
  Poster: String
});

module.exports = Movie;
