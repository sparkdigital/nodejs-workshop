'use strict';

// Set the 'NODE_ENV' env var to 'test' so other modules
// can configure themselves according to this
process.env.NODE_ENV = 'test';

// Require deps
const chai = require('chai');

// Define the assertion syntax to use
const expect = chai.expect;

// Tell chai to use the Http module
chai.use(require('chai-http'));

// Require the service to test
const MoviesService = require('../../services/movies.service.js');

const Movie = require('../../models/movie.model.js');

const testMovie = {
  imdbId: 'tt0068646',
  Title: "The Godfather",
  Year: 1972,
  Director: 'Francis Ford Coppola',
  Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BZTRmNjQ1ZDYtNDgzMy00OGE0LWE4N2YtNTkzNWQ5ZDhlNGJmL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
};

// Begin a test suite
describe('Movies Service', () => {
  before(done => {
    // Empty the Movies collection
    Movie.collection.remove();
    done();
  });

  describe(`when calling the 'saveNew()' method`, () => {
    it('should save the element to the database and return it', done => {
      const saveMovie = MoviesService.saveNew(testMovie);

      expect(saveMovie).to.be.a('promise');

      saveMovie
        .then(movie => {
          expect(movie).to.include.keys(Object.keys(testMovie));
          return Movie.findOne({ imdbId: testMovie.imdbId }).exec();
        })
        .then(result => {
          if(result) {
            done();
          }
        });
    });
  });

  describe(`when calling the 'fetchList()' method`, () => {
    it('should resolve to a list of movies', done => {
      const fetchMoviesList = MoviesService.fetchList();
      expect(fetchMoviesList).to.be.a('promise');

      fetchMoviesList.then(movies => {
        expect(movies).to.be.an('array').and.have.lengthOf(1);
        expect(movies[0]).to.include.keys(Object.keys(testMovie));
        done();
      });
    });
  });

  describe(`when calling the 'getMovie()' method`, () => {
    it('should resolve to a movie', done => {
      const getMovie = MoviesService.getMovie(testMovie.imdbId);
      expect(getMovie).to.be.a('promise');

      getMovie.then(movie => {
        expect(movie).to.include.keys(Object.keys(testMovie));
        done();
      });
    });
  });

  describe(`when calling the 'update()' method`, () => {
    it(`should update a movie and return it's info`, done => {
      const updatedData = Object.assign({}, testMovie);
      updatedData.Title = 'New Title';

      const updateMovie = MoviesService.update(testMovie.imdbId, updatedData);
      expect(updateMovie).to.be.a('promise');

      updateMovie.then(movie => {
        expect(movie).to.include.keys(Object.keys(testMovie));
        expect(movie.Title).to.equal(updatedData.Title);
        done();
      });
    });
  });

});

