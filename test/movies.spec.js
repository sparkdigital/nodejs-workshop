'use strict';

// Set the 'NODE_ENV' env var to 'test' so other modules
// can configure themselves according to this
process.env.NODE_ENV = 'test';

// Require deps
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

// Define the assertion syntax to use
const expect = chai.expect;

// We will use Sinon for mocking and spying
const sinon = require('sinon');

// Tell chai to use the Http module
chai.use(chaiHttp);

// Require dependencies we need to stub
const moviesService = require('../services/movies.service.js');
const omdbService = require('../services/omdb.service.js');

// Mocks
const mockedMoviesList = ['movies', 'movie2'];

// Begin a test suite
describe('Movies', () => {

  // Define a test block
  describe('GET /movies', () => {
    // Test setup. Runs before each test
    beforeEach(() => {
      // Stub the service method, to make it return whatever we want
      sinon.stub(moviesService, 'list').returns(mockedMoviesList);
    });

    afterEach(() => {
      // Restore the service method, for future usage
      moviesService.list.restore();
    });

    // Define a test
    it('should respond a list of movies', done => {
      chai.request(app)
        .get('/movies')
        .end((err, res) => {
          expect(res.body).to.be.an('array').and.have.lengthOf(2);
          expect(res.body).to.deep.equal(mockedMoviesList);
          done();
        });
    });
  });

  // Define another test block
  describe('GET /movies/search', () => {
    // Test setup. Runs before each test
    beforeEach(() => {
      // Stub the service method. We need to make the stub respect the NodeJS' callback convention
      // So we tell sinon to use the 2nd argument passed (index 1) as a callback
      // and send it the rest of the arguments (null and mockedMoviesList)
      sinon.stub(omdbService, 'search').callsArgWith(1, null, mockedMoviesList);
    });

    afterEach(() => {
      // Restore the service method, for future usage
      omdbService.search.restore();
    });

    // Define a test
    it('should respond a list of movies', done => {
      chai.request(app)
        .get('/movies/search?query=anything')
        .end((err, res) => {
          expect(res.body).to.be.an('array').and.have.lengthOf(2);
          expect(res.body).to.deep.equal(mockedMoviesList);
          done();
        });
    });
  });

});


