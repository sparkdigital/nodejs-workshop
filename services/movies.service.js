'use stric';

var mockedMoviesList = require('../data/mockedMoviesList.js');

class Movies {
  static fetchList () {
    return new Promise(resolve => {
      resolve(mockedMoviesList);
    });
  }
}

module.exports = Movies;
