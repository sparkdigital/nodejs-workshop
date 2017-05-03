'use strict';

// Set the 'NODE_ENV' env var to 'test' so other modules
// can configure themselves according to this
process.env.NODE_ENV = 'test';

// Require deps
const chai = require('chai');
const nock = require('nock');

// Define the assertion syntax to use
const expect = chai.expect;

// Tell chai to use the Http module
chai.use(require('chai-http'));

// Require the service to test
const OmdbService = require('../../services/omdb.service.js');

const omdbEndpoint = 'http://www.omdbapi.com';

const movieMock = {
  "Title": "Test Movie",
  "Year": "2011",
  "Response": "True"
};

// Begin a test suite
describe('OMDB Service', () => {

  // Define a test block
  describe('when searching for a movie title', () => {
    beforeEach(() => {
      // Clone movieMock object twice
      const movie1 = Object.assign({}, movieMock);
      const movie2 = Object.assign({}, movieMock);

      nock(omdbEndpoint).get(/.*/).reply(200, {
        "Search":[ movie1, movie2 ],
        "totalResults":"2",
        "Response":"True"
      });
    });

    // Define a test
    it('should respond with an array of movies', done => {
      OmdbService.search('anytitle', (err, movies) => {
        expect(movies).to.be.an('array').and.have.lengthOf(2);

        done();
      });
    });
  });

  describe('when fetching info for a particular movie', () => {
    beforeEach(() => {
      nock(omdbEndpoint).get(/.*/).reply(200, movieMock);
    });

    // Define a test
    it('should respond with a movie object', done => {
      OmdbService.get('tt1234567', (err, movie) => {
        expect(movie).to.deep.equal(movieMock);

        done();
      });
    });
  });

});

