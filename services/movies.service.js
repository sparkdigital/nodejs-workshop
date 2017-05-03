'use stric';

var mockedMoviesList = require('../data/mockedMoviesList.js');

class Movies {
  static list () {
    return mockedMoviesList;
  }
}

module.exports = Movies;
