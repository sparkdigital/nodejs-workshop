'use strict';

// Set the 'NODE_ENV' env var to 'test' so other modules
// can configure themselves according to this
process.env.NODE_ENV = 'test';

// App to be tested
const app = require('../app');

// We will use chai as an assertion library
const chai = require('chai');
// We will use Sinon for mocking and spying
const sinon = require('sinon');

// Define the assertion syntax to use
const expect = chai.expect;

// Tell chai to use modules
chai.use(require('chai-http'));
chai.use(require('sinon-chai'));

// Require dependencies we need to stub
const MoviesService = require('../services/movies.service.js');
const OmdbService = require('../services/omdb.service.js');

// Mocks
const mockedMoviesList = ['movies', 'movie2'];
const mockedMovie = { imdbId: 'tt0000000', Title: 'movie' };

// Begin a test suite
describe('Movies', () => {

  // Define a test block
  describe('GET /movies', () => {
    // Test setup. Runs before each test
    beforeEach(() => {
      // Stub the service method, to make it return whatever we want
      sinon.stub(MoviesService, 'fetchList').resolves(mockedMoviesList);
    });

    afterEach(() => {
      // Restore the service method, for future usage
      MoviesService.fetchList.restore();
    });

    // Define a test
    it('should respond with a list of movies', done => {
      chai.request(app)
        .get('/movies')
        .end((err, res) => {
          expect(res.body).to.be.an('array').and.have.lengthOf(2);
          expect(res.body).to.deep.equal(mockedMoviesList);
          done();
        });
    });
  });

  describe('POST /movies', () => {
    beforeEach(() => {
      sinon.stub(MoviesService, 'saveNew').resolves(mockedMovie);
    });
    afterEach(() => {
      MoviesService.saveNew.restore();
    });

    // Define a test
    it('should respond with a movie', done => {
      const newMovie = { imdbId: 'tt1234567', Title: 'Fargo' };

      chai.request(app)
        .post('/movies')
        .send(newMovie)
        .end((err, res) => {
          expect(MoviesService.saveNew).to.be.calledWith(newMovie);
          expect(res.body).to.deep.equal(mockedMovie);
          done();
        });
    });
  });

  describe('GET /movies/:imdbId', () => {
    beforeEach(() => {
      sinon.stub(MoviesService, 'getMovie').resolves(mockedMovie);
    });
    afterEach(() => {
      MoviesService.getMovie.restore();
    });

    it('should respond with a movie', done => {
      const imdbId = 'tt1234567';

      chai.request(app)
        .get(`/movies/${imdbId}`)
        .end((err, res) => {
          expect(MoviesService.getMovie).to.be.calledWith(imdbId);
          expect(res.body).to.deep.equal(mockedMovie);
          done();
        });
    });
  });

  describe('PUT /movies/:imdbId', () => {
    beforeEach(() => {
      sinon.stub(MoviesService, 'update').resolves(mockedMovie);
    });
    afterEach(() => {
      MoviesService.update.restore();
    });

    it('should update and respond with a movie', done => {
      const imdbId = mockedMovie.imdbId;
      const updatedData = Object.assign({}, mockedMovie);

      chai.request(app)
        .put(`/movies/${imdbId}`)
        .send(updatedData)
        .end((err, res) => {
          expect(MoviesService.update).to.be.calledWith(imdbId, updatedData);

          expect(res.body).to.include.keys(Object.keys(updatedData));
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
      sinon.stub(OmdbService, 'search').callsArgWith(1, null, mockedMoviesList);
    });

    afterEach(() => {
      // Restore the service method, for future usage
      OmdbService.search.restore();
    });

    // Define a test
    it('should respond with a list of movies', done => {
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


