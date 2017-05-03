'use stric';

const Movie = require('../models/movie.model.js');

class Movies {
  static fetchList () {
    // Execute the mongoose command and return a promise
    // The 'lean()' link is used to tell mongoose to return
    // a plain JS object, instead of a Mongoose object.
    return Movie.find({}).lean().exec();
  }

  static saveNew(movieData) {
    // Execute the mongoose command and return a promise
    // The 'lean()' link is used to tell mongoose to return
    // a plain JS object, instead of a Mongoose object.
    return new Movie(movieData).save().then(savedMovie => savedMovie.toObject());
  }

  static getMovie(imdbId) {
    const query = { imdbId };

    // Execute the mongoose command and return a promise
    // The 'lean()' link is used to tell mongoose to return
    // a plain JS object, instead of a Mongoose object.
    return Movie.findOne(query).lean().exec();
  }

  static update(imdbId, movieData) {
    const query = { imdbId: movieData.imdbId };
    const options = { new: true };

    // Execute the mongoose command and return a promise
    // The 'lean()' link is used to tell mongoose to return
    // a plain JS object, instead of a Mongoose object.
    return Movie.findOneAndUpdate(query, movieData, options).lean().exec();
  }
}

module.exports = Movies;
